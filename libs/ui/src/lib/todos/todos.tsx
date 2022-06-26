import { XCircleIcon } from '@heroicons/react/outline';
import { removeTodo } from '@tadone/client';
import { TodoMetadata } from '@tadone/data';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import './todos.module.css';

export interface TodosProps {
  todos: TodoMetadata[] | undefined;
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
          <Link to={`/todos/${id}`}>{title}</Link>
          <button onClick={() => {mutation.mutate(id)}}>
            <XCircleIcon className='ml-2 h-5 w-5 text-red-500' />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Todos;
