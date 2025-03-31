import { Typography, Button, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './EmployeeHomePage.css';

function EmployeeHomePage() {
  return (
    <Box className="employee-home-page">
      <Typography variant="h4" gutterBottom>
        Employee Dashboard
      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {/* Renting Section */}
        <Grid item xs={12} md={6}>
          <Box textAlign="center" p={3} border={1} borderRadius={2} borderColor="grey.300">
            <Typography variant="h6" gutterBottom>
              Renting Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  component={Link} 
                  to="/employee/booking-to-renting"
                  fullWidth
                >
                  Booking to Renting
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="outlined" 
                  component={Link} 
                  to="/employee/direct-renting"
                  fullWidth
                >
                  Direct Renting
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Management Section */}
        <Grid item xs={12} md={6}>
          <Box textAlign="center" p={3} border={1} borderRadius={2} borderColor="grey.300">
            <Typography variant="h6" gutterBottom>
              Data Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="text" 
                  component={Link} 
                  to="/employee/manage/customers"
                  fullWidth
                >
                  Customers
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="text" 
                  component={Link} 
                  to="/employee/manage/employees"
                  fullWidth
                >
                  Employees
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="text" 
                  component={Link} 
                  to="/employee/manage/hotels"
                  fullWidth
                >
                  Hotels
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="text" 
                  component={Link} 
                  to="/employee/manage/rooms"
                  fullWidth
                >
                  Rooms
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Views Section */}
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

export default EmployeeHomePage;