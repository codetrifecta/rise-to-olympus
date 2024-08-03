import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => {
      const { MainMenu } = await import('./pages/MainMenu');
      return { Component: MainMenu };
    },
  },
  {
    path: '/new',
    lazy: async () => {
      const { NewCampaign } = await import('./pages/NewCampaign');
      return { Component: NewCampaign };
    },
  },
  {
    path: '/load',
    lazy: async () => {
      const { LoadCampaign } = await import('./pages/LoadCampaign');
      return { Component: LoadCampaign };
    },
  },
  {
    path: '/game',
    lazy: async () => {
      const { Game } = await import('./pages/Game');
      return { Component: Game };
    },
  },
  {
    path: '*',
    lazy: async () => {
      const { ToMainMenu } = await import('./pages/ToMainMenu');
      return { Component: ToMainMenu };
    },
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<>...</>} />;
}

export default App;
