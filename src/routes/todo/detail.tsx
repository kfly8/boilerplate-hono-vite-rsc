import { Link } from '../../components/Link'
import type { Todo } from './data'

type Props = {
  todo: Todo
}

export function TodoDetailPage({ todo }: Props) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/todo" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Todo List
      </Link>

      <article className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between mb-6">
          <h1 className="text-4xl font-bold">{todo.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            todo.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {todo.status}
          </span>
        </div>

        <p className="text-gray-600 mb-6">{todo.createdAt}</p>

        <div className="mb-8">
          <p className="text-gray-700 text-lg">{todo.description}</p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Change Status</h3>
          <div className="flex gap-4">
            {todo.status !== 'pending' && (
              <form method="POST" action={`/todo/${todo.id}/status`}>
                <input type="hidden" name="status" value="pending" />
                <button
                  type="submit"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  Mark as Pending
                </button>
              </form>
            )}

            {todo.status !== 'completed' && (
              <form method="POST" action={`/todo/${todo.id}/status`}>
                <input type="hidden" name="status" value="completed" />
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Mark as Completed
                </button>
              </form>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
