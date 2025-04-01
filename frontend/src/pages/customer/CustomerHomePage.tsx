import { Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './CustomerHomePage.css';

function CustomerHomePage() {
  return (
    <Box className="customer-home-page">
      <Typography variant="h4" gutterBottom>
        Welcome to Our Hotel System
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Box textAlign="center" p={4} border={1} borderRadius={2} borderColor="grey.300">
            <Typography variant="h6" gutterBottom>
              Find Your Perfect Room
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              component={Link} 
              to="/customer/search"
              fullWidth
            >
              Search & Book Rooms
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box textAlign="center" p={3} border={1} borderRadius={2} borderColor="grey.300">
            <Typography variant="h6" gutterBottom>
              System Views
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/view/capacity"
                >
                  View Capacity
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/view/available"
                >
                  View Available Rooms
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomerHomePage;