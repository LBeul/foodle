import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootPage from '@/pages/RootPage';
import AboutPage from './pages/AboutPage';
import Footer from './components/Footer';
import ErrorPage from './pages/ErrorPage';
import RestaurantDetailsPage from './pages/RestaurantPage';
import restaurantLoader from './loaders/restaurantLoader';
import EditPage from './pages/EditPage';
import CreatePage from './pages/CreatePage';
import LoginPage from './pages/LoginPage';
import NavBarWrapper from './components/NavBar/NavBarWrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBarWrapper />,
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
      { path: '/login', element: <LoginPage />, errorElement: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <>
        <RouterProvider router={router} />
        <Footer />
      </>
    </ChakraProvider>
  </React.StrictMode>
);
