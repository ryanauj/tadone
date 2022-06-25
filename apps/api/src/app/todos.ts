import { Todo } from '@tadone/data';
import { Express, Request, Response } from 'express';

let todos: Todo[] = [];

export function addTodoRoutes(app: Express) {
  app.get('/api/todos', (_req, resp: Response) => resp.send(todos));
  app.post('/api/todos', (req: Request, resp: Response) => {
    const id = Math.floor(Math.random() * 1000).toString();
    console.log(req.body);
    const newTodo = {
      ...req.body,
      id
    };
    todos.push(newTodo);
    console.log(todos);
    resp.send(newTodo);
  });
  app.delete('/api/todos/:todoId', (req, resp) => {
    console.log('req.params', req.params)
    const { todoId } = req.params
    todos = todos.filter(({id}) => id !== todoId)
    resp.send({})
  })
}
