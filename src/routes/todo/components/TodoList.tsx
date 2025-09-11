import { Link } from '../../../components/Link'
import type { Todo } from '../data'

type Props = {
  todos: Todo[]
}

export function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return <p>No todos yet.</p>
  }

  return (
    <div className="space-y-4">
      {todos.map(todo => (
        <article key={todo.id} className={`border rounded-lg p-4 ${todo.status === 'completed' ? 'bg-green-50' : 'bg-white'}`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/todo/${todo.id}`} className="hover:underline">
                  {todo.title}
                </Link>
              </h2>
              <p className="text-gray-700 mb-2">{todo.description}</p>
              <p className="text-gray-600 text-sm">{todo.createdAt}</p>
            </div>

            <div className="ml-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                todo.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {todo.status}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
