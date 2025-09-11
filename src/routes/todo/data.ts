export type Todo = {
  id: string
  title: string
  description: string
  status: 'pending' | 'completed'
  createdAt: string
}

// Simple in-memory store
let todos: Todo[] = [
  {
    id: '1',
    title: 'Learn React',
    description: 'Study React fundamentals and build a simple app',
    status: 'pending',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Setup project',
    description: 'Initialize new project with proper tooling',
    status: 'completed',
    createdAt: '2024-01-16',
  },
]

export async function getTodos(): Promise<Todo[]> {
  return todos
}

export async function getTodo(id: string): Promise<Todo | undefined> {
  return todos.find(todo => todo.id === id)
}

export async function addTodo(title: string, description: string): Promise<Todo> {
  const newTodo: Todo = {
    id: String(Date.now()),
    title,
    description,
    status: 'pending',
    createdAt: new Date().toISOString().split('T')[0],
  }
  todos.push(newTodo)
  return newTodo
}

export async function updateTodoStatus(id: string, status: 'pending' | 'completed'): Promise<Todo | undefined> {
  const index = todos.findIndex(todo => todo.id === id)
  if (index === -1) return undefined

  todos[index] = {
    ...todos[index],
    status,
  }
  return todos[index]
}
