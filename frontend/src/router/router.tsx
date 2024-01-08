import AboutPage from '@/pages/AboutPage';
import CreatePage from '@/pages/CreatePage';
import EditPage from '@/pages/EditPage';
import ErrorPage from '@/pages/ErrorPage';
import RestaurantDetailsPage from '@/pages/RestaurantPage';
import RootPage from '@/pages/RootPage';
import { createBrowserRouter } from 'react-router-dom';
import PageWrapper from './PageWrapper';
import { restaurantLoader } from './loaders';
import LoginPage from '@/pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PageWrapper />,
    errorElement: <ErrorPage asRoot />,
    children: [
      { path: '/', element: <RootPage />, errorElement: <ErrorPage /> },
      { path: '/about', element: <AboutPage />, errorElement: <ErrorPage /> },
      {
        path: '/restaurants/:id',
        element: <RestaurantDetailsPage />,
        // @ts-expect-error: React Router internal type issues
        loader: restaurantLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/edit/:id',
        element: <EditPage />,
        // @ts-expect-error: React Router internal type issues
        loader: restaurantLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/new-restaurant',
        element: <CreatePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

export default router;
