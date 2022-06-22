import { addTodo, getAllTodos } from '@tadone/client';
import { Todos } from '@tadone/ui';
import { useMutation, useQuery, useQueryClient } from 'react-query';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const queryClient = useQueryClient();

  const query = useQuery('todos', getAllTodos);
  const mutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })

  return (
    <>
      <Todos todos={query.data} />
      <button id={'add-todo'} onClick={() => {
        mutation.mutate()
      }}>
        Add Todo
      </button>
    </>
  );
}

export default Dashboard;
