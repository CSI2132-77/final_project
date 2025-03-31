import { Typography, Button, Grid, Box, Paper, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <Container maxWidth="md">
      <Box className="home-page" sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to the Hotel Management System
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ mb: 4 }}>
          Please select your role to continue
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Customer Portal
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Search and book rooms for your stay
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/customer/home"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Continue as Customer
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom>
                Employee Portal
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Manage hotel operations and bookings
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/employee/home"
                fullWidth
                sx={{ py: 1.5 }}
                color="secondary"
              >
                Continue as Employee
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6 }}>
          <Typography variant="body2" color="text.secondary">
            Need help? Contact our support team
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;