import { StrictMode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { Todos } from '@tadone/ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='todos' element={<Todos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
