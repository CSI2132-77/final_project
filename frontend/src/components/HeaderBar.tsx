import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import StyledButton from './StyledButton';
import './HeaderBar.css';

const HeaderBar: React.FC = () => {
  return (
    <AppBar
      position="static"
      className="header-bar"
      sx={{
        width: '100%',
        backgroundColor: 'rgba(7, 81, 65, 0.8)',
      }}
    >
      <Toolbar className="header-toolbar">
        <Typography variant="h6" className="header-title">
          Hotel Management System
        </Typography>
        <Box className="header-buttons">
          <StyledButton component={Link} to="/">Home</StyledButton>
          <StyledButton component={Link} to="/search">Search &amp; Book</StyledButton>
          <StyledButton component={Link} to="/manage/customers">Customers</StyledButton>
          <StyledButton component={Link} to="/manage/employees">Employees</StyledButton>
          <StyledButton component={Link} to="/manage/hotels">Hotels</StyledButton>
          <StyledButton component={Link} to="/manage/rooms">Rooms</StyledButton>
          <StyledButton component={Link} to="/renting">Renting</StyledButton>
          <StyledButton component={Link} to="/view/capacity">Capacity</StyledButton>
          <StyledButton component={Link} to="/view/available">Avail. Rooms</StyledButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderBar;
