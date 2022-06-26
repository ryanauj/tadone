import { getAllTodosMetadata } from '@tadone/client';
import { Todos } from '@tadone/ui';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(_props: DashboardProps) {
  const query = useQuery('todos', getAllTodosMetadata);

  return (
    <>
      <Todos todos={query.data} />
      <Link
        to='/todos/add'
      >
        <button
          id={'add-todo'}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
        >
          Add Todo
        </button>
      </Link>
    </>
  );
}

export default Dashboard;
