import { TodoList } from './components/TodoList'
import { TodoForm } from './components/TodoForm'
import type { Todo } from './data'

type Props = {
  todos: Todo[]
}

export function TodoListPage({ todos }: Props) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Todo List</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  )
}
