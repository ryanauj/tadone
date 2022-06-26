import { TodoMetadata } from '@tadone/data';
import { Todo } from "@tadone/data";

async function safeFetch<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<TResponse> {
  const response = await fetch(input, init);
  return response.json();
}

export function getAllTodosMetadata(): Promise<TodoMetadata[]> {
  return safeFetch<TodoMetadata[]>('/api/todos');
}

export function getTodo(todoId: string): Promise<Todo> {
  return safeFetch<Todo>(`/api/todos/${todoId}`);
}

export function putTodo(todo: Todo | undefined): Promise<Todo> {
  return safeFetch<Todo>(
    '/api/todos',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
    }
  );
}

export function removeTodo(id: string): Promise<Todo> {
  console.log('id', id)
  return safeFetch<Todo>(
    `/api/todos/${id}`,
    {
      method: 'DELETE'
    }
  );
}

