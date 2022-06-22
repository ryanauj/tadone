import { XCircleIcon } from '@heroicons/react/outline';
import { removeTodo } from '@tadone/client';
import { Todo } from '@tadone/data';
import { useMutation, useQueryClient } from 'react-query';
import './todos.module.css';

export interface TodosProps {
  todos: Todo[] | undefined;
}

export function Todos(props: TodosProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })

  return (
    <ul>
      {props.todos?.map(({id, title}) => (
        <li key={id} className={'flex todo'}>
          <p>{title}</p>
          <button onClick={() => {mutation.mutate(id)}}>
            <XCircleIcon className='ml-2 h-5 w-5 text-red-500' />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
