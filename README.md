# Hono + Vite + React Server Components Boilerplate

A modern web application boilerplate using Hono framework with Vite and React Server Components (RSC).

## Tech Stack

- [Hono](https://hono.dev/) - Lightweight, fast web framework
- [Vite](https://vitejs.dev/) - Fast development and build tooling
- [React 19](https://react.dev/) - UI library with Server Components
- [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm or bun

### Setup

1. Clone or use this template

```sh
git clone https://github.com/kfly8/boilerplate-hono-vite-rsc.git
cd boilerplate-hono-vite-rsc
```

2. Install dependencies

```sh
npm install
```

3. Start development server

```sh
npm run dev
```

Open http://localhost:5173 to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run deploy` - Deploy to Cloudflare Workers
- `npm run cf-preview` - Preview with Wrangler locally
- `npm run cf-typegen` - Generate Cloudflare binding types

## Project Structure Summary

```
src/
├── cloudflare-workers.tsx  # Cloudflare Workers entry point
├── server.ts               # Hono server configuration
├── components/             # Shared React components
│   └── Layout.tsx         # Main layout component
├── routes/                # File-based routing
│   ├── _404.tsx          # 404 page
│   ├── _error.tsx        # Error page
│   └── home/             # Home route
│       ├── index.tsx     # Route handler
│       ├── page.tsx      # Page component
│       └── components/   # Route-specific components
└── rsc/                   # React Server Components setup
    ├── entry.browser.tsx  # Browser entry point
    ├── entry.rsc.tsx     # RSC entry point
    ├── entry.ssr.tsx     # SSR entry point
    └── rsc-renderer.tsx  # RSC renderer middleware
```

## Examples

Looking for a more feature-rich example? Check out [hono-vite-rsc-shadcnui](https://github.com/kfly8-sandbox/hono-vite-rsc-shadcnui) for an implementation with shadcn/ui components.

## License

[MIT](./LICENSE)

