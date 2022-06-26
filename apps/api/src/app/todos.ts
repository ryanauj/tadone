import { TodoMetadata } from '@tadone/data';
import { Todo } from '@tadone/data';
import { Request, Response, Router } from 'express';

const todoRouter = Router();

let todos: Todo[] = [];

function removeTodo(todoId: string) {
  todos = todos.filter(({id}) => id !== todoId);
}

function buildErrorResponse(todoId: string): Todo {
  return {
    id: undefined,
    title: `Todo '${todoId}' not found`,
    description: `Todo with id '${todoId}' could not be found`
  };
}

todoRouter.get(
  '/',
  (_req, resp: Response<TodoMetadata[]>) => {
    const todoMetadata = todos.map(({ id, title }) => ({ id, title }))
    resp.send(todoMetadata)
  }
);

todoRouter.get(
  '/:todoId',
  (req, resp: Response<Todo>) => {
    const { todoId } = req.params;
    const todo = todos.find(({id}) => id === todoId);

    if (todo === undefined) {
      resp.status(404).send(buildErrorResponse(todoId));
    }
    else {
      resp.send(todo);
    }
  }
);

todoRouter.put(
  '/',
  (req: Request<unknown, unknown, Todo>, resp: Response) => {
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
    const { todoId } = req.params
    removeTodo(todoId);
    resp.send({});
  })

export default todoRouter;
