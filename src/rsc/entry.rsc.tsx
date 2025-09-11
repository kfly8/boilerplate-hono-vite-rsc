import app from '../server'

export default app.fetch

if (import.meta.hot) {
  import.meta.hot.accept()
}
