import { Todo } from '@tadone/data';
import { Request, Response, Router } from 'express';

const todoRouter = Router();

let todos: Todo[] = [];

function removeTodo(todoId: string) {
  todos = todos.filter(({id}) => id !== todoId);
}

todoRouter.get(
  '/',
  (_req, resp: Response<Todo[]>) => resp.send(todos)
);

todoRouter.put(
  '/',
  (req: Request<unknown, unknown, Todo>, resp: Response) => {
    console.log('req.params', req.body)
    const todo = req.body;
    if (todo.id === '' || todo.id === undefined) {
      todo.id = Math.floor(Math.random() * 1000).toString();
    }
    else {
      removeTodo(todo.id);
    }
    todos.push(todo);
    resp.send(todo);
  });

todoRouter.delete(
  '/:todoId',
  (req, resp) => {
    console.log('req.params', req.params)
    const { todoId } = req.params
    removeTodo(todoId);
    resp.send({});
  })

export default todoRouter;
