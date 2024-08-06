import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import './index.css';
import CountryDetailsPage from './pages/CountryDetailsPage.jsx';
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
  {
    path: 'country-details/:name',
    element: <CountryDetailsPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
