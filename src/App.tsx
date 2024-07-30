import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewCampaign } from './pages/NewCampaign';
import { LoadCampaign } from './pages/LoadCampaign';

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
    element: <LoadCampaign />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
