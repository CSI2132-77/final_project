import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';

// Common pages
import HomePage from './pages/HomePage';
import AggregatedCapacityViewPage from './pages/AggregatedCapacityViewPage';
import AvailableRoomsViewPage from './pages/AvailableRoomsViewPage';

// Customer pages
import CustomerHomePage from './pages/customer/CustomerHomePage';
import SearchAndBookPage from './pages/customer/SearchAndBookPage';

// Employee pages
import EmployeeHomePage from './pages/employee/EmployeeHomePage.tsx';
import BookingToRentingPage from './pages/employee/BookingToRentingPage';
import DirectRentingPage from './pages/employee/DirectRentingPage';
import ManageCustomersPage from './pages/employee/ManageCustomersPage';
import ManageEmployeesPage from './pages/employee/ManageEmployeesPage';
import ManageHotelsPage from './pages/employee/ManageHotelsPage';
import ManageRoomsPage from './pages/employee/ManageRoomsPage';

import './App.css';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Box className="app-content">
        <Container maxWidth="xl">
          <Routes>
            {/* Common routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/view/capacity" element={<AggregatedCapacityViewPage />} />
            <Route path="/view/available" element={<AvailableRoomsViewPage />} />
            
            {/* Customer routes */}
            <Route path="/customer/home" element={<CustomerHomePage />} />
            <Route path="/customer/search" element={<SearchAndBookPage />} />
            
            {/* Employee routes */}
            <Route path="/employee/home" element={<EmployeeHomePage />} />
            <Route path="/employee/booking-to-renting" element={<BookingToRentingPage />} />
            <Route path="/employee/direct-renting" element={<DirectRentingPage />} />
            <Route path="/employee/manage/customers" element={<ManageCustomersPage />} />
            <Route path="/employee/manage/employees" element={<ManageEmployeesPage />} />
            <Route path="/employee/manage/hotels" element={<ManageHotelsPage />} />
            <Route path="/employee/manage/rooms" element={<ManageRoomsPage />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;