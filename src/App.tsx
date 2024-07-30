import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new',
    element: <Home />,
  },
  {
    path: '/load',
    element: <div>Load Campaign...</div>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
