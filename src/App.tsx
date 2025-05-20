
import { useState } from 'react';
import Login from './components/Login'
import UserAvatar from './components/UserAvatar'
import { UserProvider } from './context/UserContext'
import { Box } from '@mui/material';
import { Register } from './components/registration';
import { RouterProvider } from 'react-router-dom';
import { router } from './components/router';
import { Provider } from 'react-redux';
import { store } from './store/recipeStore';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
    <Provider store={store}>
      <UserProvider>
        {isLoggedIn?(
          <>
          <Box display="flex"sx={{ mt: 8 }}>
            <UserAvatar />
          </Box>
          </>
        ):(
          <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' ,marginTop:'22px'}}>
            <Login onLoginSuccess={handleLoginSuccess} />
            <Register />
          </Box>
          </>
        )}
    
       <RouterProvider router={router} />
    </UserProvider>
 
    </Provider>

    </>
  )
}

export default App
