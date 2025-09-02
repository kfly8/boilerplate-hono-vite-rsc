import app from '../server'
import type { ReactFormState } from 'react-dom/client'

export default app.fetch

export type RscPayload = {
  root: React.ReactNode
  returnValue?: unknown
  formState?: ReactFormState
}

if (import.meta.hot) {
  import.meta.hot.accept()
}
