import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import HeaderBar from './components/HeaderBar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import SearchAndBookPage from './pages/SearchAndBookPage';
import ManageCustomersPage from './pages/ManageCustomersPage';
import ManageEmployeesPage from './pages/ManageEmployeesPage';
import ManageHotelsPage from './pages/ManageHotelsPage.tsx';
import ManageRoomsPage from './pages/ManageRoomsPage';
import RentingPage from './pages/RentingPage';
import AggregatedCapacityViewPage from './pages/AggregatedCapacityViewPage';
import AvailableRoomsViewPage from './pages/AvailableRoomsViewPage';

import './App.css';

function App() {
  return (
    <Router>
      <HeaderBar />
      <Box className="app-content">
        {/* Use a Container to limit content width while keeping header/footer full width */}
        <Container maxWidth="md">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchAndBookPage />} />
            <Route path="/manage/customers" element={<ManageCustomersPage />} />
            <Route path="/manage/employees" element={<ManageEmployeesPage />} />
            <Route path="/manage/hotels" element={<ManageHotelsPage />} />
            <Route path="/manage/rooms" element={<ManageRoomsPage />} />
            <Route path="/renting" element={<RentingPage />} />
            <Route path="/view/capacity" element={<AggregatedCapacityViewPage />} />
            <Route path="/view/available" element={<AvailableRoomsViewPage />} />
          </Routes>
        </Container>
      </Box>
      <Footer />
    </Router>
  );
}

export default App;
