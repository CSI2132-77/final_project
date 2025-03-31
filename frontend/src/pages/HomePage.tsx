import { Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <Box className="home-page">
      <Typography variant="h4" gutterBottom>
        Welcome to the Hotel Management System
      </Typography>
      <Typography variant="body1" gutterBottom>
        Explore our services using the navigation above.
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Button variant="contained" component={Link} to="/search">
            Search Rooms
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" component={Link} to="/manage/customers">
            Manage Customers
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
