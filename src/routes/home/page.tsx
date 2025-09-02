import { Counter } from './components/Counter'

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl space-y-12">
        <Counter />
      </div>
    </div>
  )
}
