import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OpeningTrainer from './components/OpeningTrainer/OpeningTrainer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <OpeningTrainer />, // FIXME fix routing and make /openingTrainer available
  },
  {
    path: "/openingTrainer",
    element: <OpeningTrainer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
