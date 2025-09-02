# Hono + Vite + React Server Components + shadcn/ui

Modern tech stack trial with React Server Components

## Features

- 🔥 **[Hono](https://hono.dev)**
- ⚙️  **[Vite](https://vite.dev/)**
- ⚡ **React Server Components** - powered by [@vitejs/plugin-rsc](https://www.npmjs.com/package/@vitejs/plugin-rsc)
- 🎨 **[shadcn/ui](https://ui.shadcn.com/)**

## Getting Started

### Installation

```bash
# Install dependencies
bun install
```

### Development

```bash
# Start development server
bun run dev
```

### Build

```bash
# Build for production
bun run build
```

### Preview

```bash
# Preview production build
bun run preview
```

## Project Structure Summary

```
src/
├── assets/          # Static assets (logos, etc.)
├── components/      # Reusable components
│   ├── ui/          # shadcn/ui components with Storybook stories
│   └── Layout.tsx 
│
├── routes/                   # File-based routing
│   ├── api/
│   │   └── users/            # GET /api/users
│   ├── counter/              # GET /counter
│   │    ├── index.tsx        # Route handler
│   │    ├── index.test.ts    # Route tests
│   │    ├── page.tsx         # Page component
│   │    ├── page.stories.tsx # Page story
│   │    └── components/      # Route-specific components
│   ├── _404.tsx              # 404 error page
│   └── _error.tsx            # Error handling page
│
├── rsc/                      # React Server Components entry points
├── cloudflare-workers.tsx    # Cloudflare Workers deployment
├── server.ts                 # Main server with auto-routing
└── style.css                 # Global Tailwind styles
```

