import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import OpeningTrainer from './components/OpeningTrainer/OpeningTrainer';
import HomeScreen from './components/HomeScreen/HomeScreen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "openingTrainer",
    element: <OpeningTrainer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
