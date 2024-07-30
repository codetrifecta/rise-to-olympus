import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewCampaign } from './pages/NewCampaign';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/new',
    element: <NewCampaign />,
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
