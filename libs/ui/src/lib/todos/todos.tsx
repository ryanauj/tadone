import { Todo } from '@tadone/data';
import './todos.module.css';

export interface TodosProps {
  todos: Todo[] | undefined;
}

export function Todos(props: TodosProps) {
  return (
    <ul>
      {props.todos?.map((t) => (
        <li className={'todo'}>{t.title}</li>
      ))}
    </ul>
  );
}

export default Todos;
