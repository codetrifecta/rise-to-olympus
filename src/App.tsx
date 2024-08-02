import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainMenu } from './pages/MainMenu';
import { NewCampaign } from './pages/NewCampaign';
import { LoadCampaign } from './pages/LoadCampaign';
import { Game } from './pages/Game';
import { ToMainMenu } from './pages/ToMainMenu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMenu />,
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
  {
    path: '*',
    element: <ToMainMenu />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
