import { createMiddleware } from 'hono/factory'
import * as ReactServer from '@vitejs/plugin-rsc/rsc'
import type { ReactFormState } from 'react-dom/client'
import type { RscPayload } from './types'

// Props interface that can be extended by users
export interface Props {
  children?: React.ReactNode
}

export type RscRendererOptions = {
  Layout: React.FC<Props>
}

// This declaration is necessary to type the c.render() method in Hono
declare module 'hono' {
  interface ContextRenderer {
    (component: React.ReactNode, props?: Props): Response | Promise<Response>
  }
}

export const rscRenderer = ({ Layout }: RscRendererOptions) => {
  return createMiddleware(async (c, next) => {
  const request = c.req.raw

  // Handle server actions (POST requests)
  if (request.method === 'POST') {
    let returnValue: unknown | undefined
    let formState: ReactFormState | undefined
    let temporaryReferences: unknown | undefined

    const actionId = request.headers.get('x-rsc-action')
    if (actionId) {
      const contentType = request.headers.get('content-type')
      const body = contentType?.startsWith('multipart/form-data')
        ? await request.formData()
        : await request.text()
      temporaryReferences = ReactServer.createTemporaryReferenceSet()
      const args = await ReactServer.decodeReply(body, { temporaryReferences })
      const action = await ReactServer.loadServerAction(actionId)
      returnValue = await action.apply(null, args)
    } else {
      const formData = await request.formData()
      const decodedAction = await ReactServer.decodeAction(formData)
      const result = await decodedAction()
      formState = await ReactServer.decodeFormState(result, formData)
    }

    // Store action results in context for render
    c.set('rscActionResult', { returnValue, formState, temporaryReferences })
  }

  // Set up the render function
  c.setRenderer(async (component: React.ReactNode, props?: Props) => {
    // Get action results if they exist
    const actionResult = c.get('rscActionResult') || {}
    const { returnValue, formState, temporaryReferences } = actionResult

    // Create RSC payload with the component wrapped in Layout
    const rscPayload: RscPayload = {
      root: <Layout {...props}>{component}</Layout>,
      formState,
      returnValue
    }

    const rscOptions = temporaryReferences ? { temporaryReferences } : {}
    const rscStream = ReactServer.renderToReadableStream<RscPayload>(
      rscPayload,
      rscOptions,
    )

    // Check if this is an RSC request or HTML request
    const url = new URL(request.url)
    const isRscRequest =
      (!request.headers.get('accept')?.includes('text/html') &&
        !url.searchParams.has('__html')) ||
      url.searchParams.has('__rsc')

    if (isRscRequest) {
      return c.body(rscStream, 200, {
        'content-type': 'text/x-component;charset=utf-8',
        vary: 'accept',
      })
    }

    // Delegate to SSR for HTML rendering
    const ssrEntryModule = await import.meta.viteRsc.loadModule<
      typeof import('./entry.ssr.js')
    >('ssr', 'index')
    const htmlStream = await ssrEntryModule.renderHTML(rscStream, {
      formState,
      debugNojs: url.searchParams.has('__nojs'),
    })

    return c.body(htmlStream, 200, {
      'Content-Type': 'text/html; charset=utf-8',
      vary: 'accept',
    })
  })

    await next()
  })
}

if (import.meta.hot) {
  import.meta.hot.accept()
}
