import { addTodo, deleteTodo, getTodos } from '@tadone/client';
import { Todo } from '@tadone/data';
import { Todos } from '@tadone/ui';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface DashboardProps {}

export function Dashboard(props: DashboardProps) {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    refreshTodos()
  }, []);

  function refreshTodos() {
    getTodos()
      .then(setTodos);
  }

  function add() {
    addTodo('')
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      });
  }

  async function remove(id: string) {
    await deleteTodo(id)
    refreshTodos()
  }

  return (
    <>
      <Todos todos={todos} />
      <button id={'add-todo'} onClick={add}>
        Add Todo
      </button>
    </>
  );
}

export default Dashboard;
