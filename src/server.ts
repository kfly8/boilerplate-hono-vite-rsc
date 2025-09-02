import { Hono } from 'hono'
import { Layout } from './components/Layout'
import { rscRenderer } from './rsc/rsc-renderer'
import { logger } from 'hono/logger'

import notFound from './routes/_404'
import onError from './routes/_error'

const app = new Hono()

app.use(rscRenderer({ Layout }))
app.use(logger())

const modules = import.meta.glob([
  './routes/**/index.(ts|tsx)',
  '!./routes/**/*.test.(ts|tsx)',
  '!./routes/**/*.spec.(ts|tsx)',
  '!./routes/**/*.stories.(ts|tsx)'
], { eager: true })

for (const path in modules) {
  const module = modules[path] as any
  if (module.default) {
    app.route('/', module.default)
  }
}

app.notFound(notFound)
app.onError(onError)

export default app;
