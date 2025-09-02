import { Hono } from 'hono'
import { HomePage } from './page'

const app = new Hono()

app.get('/', (c) => {
  return c.render(<HomePage />, { title: 'Home' })
})

export default app
