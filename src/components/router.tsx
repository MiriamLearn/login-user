import About from "./About";
import Home from "./Home";
import AppLayout from "./appLayout";
import { createBrowserRouter } from 'react-router-dom';
export const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />, 
      children: [
        {
          index: true,
          element: <Home />,  
        },
        {
          path: '/about',
          element: <About />,  
        },
      ],
    },
  ]);

