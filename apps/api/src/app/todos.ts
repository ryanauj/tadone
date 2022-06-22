import { Todo } from '@tadone/data';
import { Express } from 'express';

let todos: Todo[] = [{ id: '1', title: 'Todo 1' }, { id: '2', title: 'Todo 2' }];

export function addTodoRoutes(app: Express) {
  app.get('/api/todos', (_req, resp) => resp.send(todos));
  app.post('/api/todos', (_req, resp) => {
    const id = Math.floor(Math.random() * 1000).toString();
    const newTodo: Todo = {
      id,
      title: `New todo ${id}`,
    };
    todos.push(newTodo);
    resp.send(newTodo);
  });
  app.delete('/api/todos/:todoId', (req) => {
    const { todoId } = req.params
    todos = todos.filter(({id}) => id === todoId)
  })
}
