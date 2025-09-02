import rsc from '@vitejs/plugin-rsc'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    rsc(),
    react(),
    tailwindcss(),
  ],

  // The @vitejs/plugin-rsc bundles React's react-server-dom implementation,
  // which relies on process.env.NODE_ENV to determine whether to use
  // development or production builds. While Vite uses 'mode' internally,
  // we need to define process.env.NODE_ENV to ensure React RSC components
  // use the correct build variant. Without this, the server and client
  // may use mismatched React versions, causing runtime errors.
  // Note: This workaround may become unnecessary in future versions as
  // Vite's RSC support matures or React adopts Vite's native environment variables.
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },

  environments: {
    rsc: {
      build: {
        rollupOptions: {
          input: {
            index: './src/rsc/entry.rsc.tsx',
            workers: './src/cloudflare-workers.tsx',
          },
        },
      },
    },

    ssr: {
      build: {
        rollupOptions: {
          input: {
            index: './src/rsc/entry.ssr.tsx',
          },
        },
      },
    },

    client: {
      build: {
        rollupOptions: {
          input: {
            index: './src/rsc/entry.browser.tsx',
          },
        },
      },
    }
  },
}))
