import React from 'react';
import { Box, Typography } from '@mui/material';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Typography variant="body2">
        © {new Date().getFullYear()} Hotel Management System. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
