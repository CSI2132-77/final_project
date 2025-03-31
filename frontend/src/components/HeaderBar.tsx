import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import StyledButton from './StyledButton';
import './HeaderBar.css';

const HeaderBar: React.FC = () => {
  const location = useLocation();
  const isEmployeePath = location.pathname.startsWith('/employee');
  const isCustomerPath = location.pathname.startsWith('/customer');
  const isViewPath = location.pathname.startsWith('/view');

  return (
    <AppBar position="static" className="header-bar">
      <Toolbar className="header-toolbar">
        <Typography variant="h6" className="header-title">
          Hotel Management System
        </Typography>
        <Box className="header-buttons">
          {/* Always show Home button pointing to root */}
          <StyledButton 
            component={Link} 
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </StyledButton>

          {/* Show role-specific buttons */}
          {isEmployeePath && (
            <>
              <StyledButton 
                component={Link} 
                to="/employee/booking-to-renting"
                className={location.pathname === '/employee/booking-to-renting' ? 'active' : ''}
              >
                Booking to Renting
              </StyledButton>
              <StyledButton 
                component={Link} 
                to="/employee/direct-renting"
                className={location.pathname === '/employee/direct-renting' ? 'active' : ''}
              >
                Direct Renting
              </StyledButton>
            </>
          )}

          {isCustomerPath && (
            <StyledButton 
              component={Link} 
              to="/customer/search"
              className={location.pathname === '/customer/search' ? 'active' : ''}
            >
              Search Rooms
            </StyledButton>
          )}

          {/* Always show shared view buttons */}
          <StyledButton 
            component={Link} 
            to="/view/capacity"
            className={location.pathname === '/view/capacity' ? 'active' : ''}
          >
            View Capacity
          </StyledButton>
          <StyledButton 
            component={Link} 
            to="/view/available"
            className={location.pathname === '/view/available' ? 'active' : ''}
          >
            View Available
          </StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;