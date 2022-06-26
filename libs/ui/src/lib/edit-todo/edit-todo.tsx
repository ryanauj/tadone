import { getTodo, putTodo } from '@tadone/client';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@tadone/ui';
import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import { EmptyTodo, Todo } from '@tadone/data';
import { useMutation, useQuery, useQueryClient } from 'react-query';

/* eslint-disable-next-line */
export interface EditTodoProps {}

export function EditTodo(props: EditTodoProps) {
  const routeParams = useParams();
  const { todoId }  = routeParams;
  if (todoId === undefined) {
    throw new Error("Route param 'todoId' cannot be undefined!");
  }

  const [todo, setTodo] = useState<Todo>(EmptyTodo());
  const {isLoading, isError} = useQuery(
    ['todos', todoId],
    () => getTodo(todoId),
    { onSuccess: setTodo }
  );
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(todo);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(putTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })

  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(todo);
    mutation.mutate(todo);
    navigate('/todos');
  }
  const handleCancel = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate('/todos');
  }

  if (isLoading) {
    return <span>Loading</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <div className='w-full max-w-xs'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit}
      >
        <div className='mb-4'>
          <Input label='Title' name='title' type='text' value={todo.title} onChange={handleChange} autoFocus={true} />
        </div>
        <div className='mb-6'>
          <Input label='Description' name='description' type='textarea' value={todo.description} onChange={handleChange} />
        </div>
        <div className='flex items-center justify-between'>
          <div
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            onClick={handleCancel}
          >
            Cancel
          </div>
          <input
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            value='Save'
          />
        </div>
      </form>
    </div>
  );
}

export default EditTodo;
