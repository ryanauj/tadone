import { Input } from '@tadone/ui';
import { Todo } from '@tadone/data';
import { ChangeEvent, FormEvent, useState } from 'react';
import { putTodo } from '@tadone/client';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface AddTodoProps {}

export function AddTodo(props: AddTodoProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState<Todo>({
    id: '',
    title: '',
    description: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mutation = useMutation(putTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(todo);
    navigate('/todos');
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
          <Input label='Description' name='description' type='text' value={todo.description} onChange={handleChange} />
        </div>
        <div className='flex items-center justify-between'>
          <input
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            value='Create'
          />
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
