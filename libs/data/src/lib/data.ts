export interface TodoMetadata {
  id: string;
  title: string;
}

export interface Todo extends TodoMetadata {
  description: string;
}

export function EmptyTodo(): Todo {
  return {
    id: '',
    title: '',
    description: ''
  }
}
