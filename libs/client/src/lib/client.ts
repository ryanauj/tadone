import { Todo } from "@tadone/data";

async function safeFetch<TResponse>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<TResponse> {
  const response = await fetch(input, init);
  return response.json();
}

export function getAllTodos(): Promise<Todo[]> {
  return safeFetch<Todo[]>('/api/todos');
}

export function addTodo(): Promise<Todo> {
  return safeFetch<Todo>(
    '/api/todos',
    {
      method: 'POST',
      body: '',
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

