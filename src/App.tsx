import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewCampaign } from './pages/NewCampaign';
import { LoadCampaign } from './pages/LoadCampaign';
import { Game } from './pages/Game';

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
  {
    path: '/game',
    element: <Game />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
