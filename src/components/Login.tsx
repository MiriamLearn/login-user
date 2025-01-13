import { useContext, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import UserContext from '../context/UserContext';
import axios from 'axios';

export const Login= ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('Your Component must be used within a UserProvider');
  }
  const {dispatch}=context;
  // const { user, dispatch } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleLogin = async() => {
    try{
      const res =await axios.post('http://localhost:3000/api/user/login',{
        email:email,
        password:password
      });
      dispatch({
        type: 'CREATE_USER',
        payload: res.data.user
      });
      console.log(res.data.message);
      if (res.data.message) {
        alert('Login successful!');
        setOpen(false);
        onLoginSuccess();
      } else {
        alert("You can't login");
      }
    }catch (error: Error|any) {
      alert('Error during login: ' + error.message);
    }
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}sx={{ backgroundColor: '#b7a710', color: 'white', padding: 1,zIndex: 1300}}>
        Login
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 3, bgcolor: 'white', margin: 'auto', width: 300, mt: 10 }}>
          <Typography variant="h6">Login</Typography>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" onClick={handleLogin} sx={{backgroundColor: '#b7a710', color: 'white', padding: 1}}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Login;





//////////what i did first://////////
// export const Login: React.FC = () => {
//   const { user, dispatch } = useContext(UserContext);
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState('');

//   const handleLogin = () => {
//     if (email !== user.email) {
//       dispatch({ type: 'RESET_USER' });
//     }
//     setOpen(false);
//   };

//   return (