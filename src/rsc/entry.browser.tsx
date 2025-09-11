import * as ReactClient from '@vitejs/plugin-rsc/browser'
import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import { rscStream } from 'rsc-html-stream/client'
import type { RscPayload } from './types'
import { generateRequestId } from './utils/request-id'

async function main() {
  let setPayload: (v: RscPayload) => void

  const initialPayload = await ReactClient.createFromReadableStream<RscPayload>(
    rscStream,
  )

  function BrowserRoot() {
    const [payload, setPayload_] = React.useState(initialPayload)

    React.useEffect(() => {
      setPayload = (v) => React.startTransition(() => setPayload_(v))
    }, [setPayload_])

    React.useEffect(() => {
      return listenNavigation(() => fetchRscPayload())
    }, [])

    return payload.root
  }

  async function fetchRscPayload() {
    const requestId = generateRequestId(window.location.href)

    const url = new URL(window.location.href, window.location.origin)
    url.searchParams.set('_rsc', requestId)

    const payload = await ReactClient.createFromFetch<RscPayload>(
      fetch(url.toString(), {
        headers: {
          'RSC': '1',
        },
      })
    )
    setPayload(payload)
  }

  const browserRoot = (
    <React.StrictMode>
      <BrowserRoot />
    </React.StrictMode>
  )
  ReactDOMClient.hydrateRoot(document, browserRoot)

  if (import.meta.hot) {
    import.meta.hot.on('rsc:update', () => {
      fetchRscPayload()
    })
  }
}

function listenNavigation(onNavigation: () => void) {
  window.addEventListener('popstate', onNavigation)

  const oldPushState = window.history.pushState
  window.history.pushState = function (...args) {
    const res = oldPushState.apply(this, args)
    onNavigation()
    return res
  }

  const oldReplaceState = window.history.replaceState
  window.history.replaceState = function (...args) {
    const res = oldReplaceState.apply(this, args)
    onNavigation()
    return res
  }

  return () => {
    window.removeEventListener('popstate', onNavigation)
    window.history.pushState = oldPushState
    window.history.replaceState = oldReplaceState
  }
}

main()
