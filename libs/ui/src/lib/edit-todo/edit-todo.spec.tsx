import { render } from '@testing-library/react';

import EditTodo from './edit-todo';

describe('EditTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditTodo />);
    expect(baseElement).toBeTruthy();
  });
});
