import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Client from './components/Client/Client';
import OpeningTrainer from './components/OpeningTrainer/OpeningTrainer';
import Board from './components/Board/Board';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Client />,
  },
  {
    path: "/openingTrainer",
    element: <OpeningTrainer />,
  },
  {
    path: "/randomBoard",
    element: <Board />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
