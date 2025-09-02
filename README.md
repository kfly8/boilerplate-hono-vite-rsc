# Hono + Vite + React Server Components Boilerplate

A modern web application boilerplate using Hono framework with Vite and React Server Components (RSC).

## Features

- **Hono** - Lightweight, fast web framework for the Edge
- **Vite** - Fast development and build tooling
- **React Server Components** - Next-generation React architecture
- **Tailwind CSS v4** - Utility-first CSS framework

## Tech Stack

- [Hono](https://hono.dev/) - Web framework
- [Vite](https://vitejs.dev/) - Build tool
- [React 19](https://react.dev/) - UI library with Server Components
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling


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

