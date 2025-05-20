import About from "./About";
import Home from "./Home";
import RecipeApp from "./RecipeApp";
import AddRecipe from "./addRecipe";
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
          path:'/home',
          element:<Home />
        },
        {
          path: '/about',
          element: <About />,  
        },
        {
          path: '/recipes', 
          element: <RecipeApp />,  
        },
        {
          path: '/addRecipe',
          element: <AddRecipe />,  
        },
      ],
    },
  ]);

