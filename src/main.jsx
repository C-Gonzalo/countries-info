import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import CountryDetailsPage from './pages/CountryDetailsPage.jsx';

const router = createBrowserRouter([
  {
    index: true,
    element: <App />,
  },
  {
    path: 'country-details/:name',
    element: <CountryDetailsPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
