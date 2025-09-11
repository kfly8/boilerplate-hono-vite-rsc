import { Hono } from 'hono'
import { TodoListPage } from './list'
import { TodoDetailPage } from './detail'
import { getTodos, getTodo, addTodo, updateTodoStatus } from './data'

const app = new Hono().basePath('/todo')

// GET /todo - List all todos
app.get('/', async (c) => {
  const todos = await getTodos()
  return c.render(<TodoListPage todos={todos} />, { title: 'Todo List' })
})

// GET /todo/:id - Get todo detail
app.get('/:id', async (c) => {
  const id = c.req.param('id')
  const todo = await getTodo(id)

  if (!todo) {
    return c.notFound()
  }

  return c.render(<TodoDetailPage todo={todo} />, { title: todo.title })
})

// POST /todo - Add new todo
app.post('/', async (c) => {
  const formData = await c.req.formData()
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  if (!title || !description) {
    return c.redirect('/todo')
  }

  await addTodo(title, description)
  return c.redirect('/todo')
})

// POST /todo/:id/status - Update todo status
app.post('/:id/status', async (c) => {
  const id = c.req.param('id')
  const formData = await c.req.formData()
  const status = formData.get('status') as 'pending' | 'completed'

  if (!status || (status !== 'pending' && status !== 'completed')) {
    return c.redirect(`/todo/${id}`)
  }

  await updateTodoStatus(id, status)
  return c.redirect(`/todo/${id}`)
})

export default app
