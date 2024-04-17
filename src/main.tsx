import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Dynamic from '@/routes/dynamic.tsx';
// import Profile from '@/routes/profile.tsx';
import { rootnode } from './routes/routes';
import '@/index.css';

const router = createBrowserRouter([rootnode.getNode()]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
