import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
      <>
        <AppBar color="transparent"
          sx={{bgcolor: '#2e9784', boxShadow: 3 ,height: '14%'}}>
          <Toolbar  sx={{display: 'flex',gap: '7px',justifyContent: 'flex-end',alignItems: 'flex-start',paddingRight: 2,}}>
            <Button color="inherit" component={Link} to="/home" sx={{ marginTop: 3,color: '#018ba3',backgroundColor: '#b7a710',marginRight:'5px', fontWeight: 'bold' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about" sx={{ marginTop: 3, color: '#018ba3',backgroundColor: '#b7a710', fontWeight: 'bold' }}>
              About
            </Button>
            <Button color="inherit" component={Link} to="/recipes" sx={{ marginTop: 3, color: '#018ba3',backgroundColor: '#b7a710', fontWeight: 'bold' }}>
             Recipes
            </Button>
            <Button color="inherit" component={Link} to="/addRecipe" sx={{ marginTop: 3, color: '#018ba3',backgroundColor: '#b7a710', fontWeight: 'bold' }}>
             Add Recipe
            </Button>
          </Toolbar>
        </AppBar>

        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Outlet /> 
        </div>
      </>
    );
  };

  export default AppLayout;