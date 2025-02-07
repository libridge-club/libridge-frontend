import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from './components/HomeScreen/HomeScreen';
import OpeningTrainer from './components/OpeningTrainer/OpeningTrainer';
import './index.css';
import BiddingTrainer from './components/BiddingTrainer/BiddingTrainer';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "openingTrainer",
    element: <OpeningTrainer />,
  },
  {
    path: "biddingTrainer",
    element: <BiddingTrainer />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
