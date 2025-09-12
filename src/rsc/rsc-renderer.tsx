import { createMiddleware } from 'hono/factory'
import * as ReactServer from '@vitejs/plugin-rsc/rsc'
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

  // Set up the render function
  c.setRenderer(async (component: React.ReactNode, props?: Props) => {

    // Create RSC payload with the component wrapped in Layout
    const rscPayload: RscPayload = {
      root: <Layout {...props}>{component}</Layout>,
    }

    const rscOptions = {}
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
