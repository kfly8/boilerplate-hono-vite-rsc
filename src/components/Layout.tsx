import { ViteClient } from 'vite-ssr-components/react'
import React from 'react'
import type { Props } from '../rsc/rsc-renderer'
import '../style.css'

declare module '../rsc/rsc-renderer' {
  interface Props {
    title?: string
  }
}

export const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>{title ?? "hono-vite-rsc-shadcnui" }</title>
        {/* 
          WORKAROUND: Manually check for development environment before rendering ViteClient.
          ViteClient is expected to handle this branching internally, but due to compatibility 
          issues with RSC (React Server Components) build process, it doesn't work as expected.
          This explicit environment check ensures ViteClient only renders in development.
        */}
        {import.meta.env.DEV && <ViteClient />}
      </head>
      <body>{children}</body>
    </html>
  )
}
