import { StrictMode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import Dashboard from './app/dashboard/dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AddTodo, EditTodo } from '@tadone/ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <App /> }>
            <Route path='/' element={ <Navigate to='todos' /> } />
            <Route path='todos' element={ <Dashboard /> } />
            <Route path='todos/add' element={ <AddTodo /> } />
            <Route path='todos/:todoId' element={ <EditTodo /> } />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
