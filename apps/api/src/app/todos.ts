import { TodoMetadata } from '@tadone/data';
import { Todo } from '@tadone/data';
import { Request, Response, Router } from 'express';

// Are all express methods essentially just middleware?
// Since order seems to matter with these as well?

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

todoRouter.use((req, res, next) => {
  console.log('before');
  next();
});

todoRouter.get(
  '/',
  (_req, resp: Response<TodoMetadata[]>, next) => {
    const todoMetadata = todos.map(({ id, title }) => ({ id, title }))
    resp.send(todoMetadata)
    next()
  }
);

todoRouter.get(
  '/:todoId',
  (req, resp: Response<Todo>, next) => {
    const { todoId } = req.params;
    const todo = todos.find(({id}) => id === todoId);

    if (todo === undefined) {
      resp.status(404).send(buildErrorResponse(todoId));
    }
    else {
      resp.send(todo);
    }
    next();
  }
);

todoRouter.put(
  '/',
  (req: Request<unknown, unknown, Todo>, resp: Response, next) => {
    const todo = req.body;
    console.log(todo);
    if (todo.id === '' || todo.id === undefined) {
      todo.id = Math.floor(Math.random() * 1000).toString();
    }
    else {
      removeTodo(todo.id);
    }
    todos.push(todo);
    resp.send(todo);
    next();
  });

todoRouter.delete(
  '/:todoId',
  (req, resp, next) => {
    const { todoId } = req.params
    removeTodo(todoId);
    resp.send({});
    next();
  })

todoRouter.use((req, res, next) => {
  console.log('after');
  console.log(todos);
  next();
});

export default todoRouter;
