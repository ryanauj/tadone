import { Navbar } from '@tadone/ui';
import { Outlet } from 'react-router-dom';

export const App = () => {

  return (
    <div className='container mx-auto px-4'>
      <Navbar></Navbar>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
    </div>
  );
};

export default App;
