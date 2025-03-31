import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Grid, Paper, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { searchRooms, createBooking, getRentings, checkInPerson, getCustomers } from '../api';
import StyledButton from '../components/StyledButton';
import './RentingPage.css';

interface Room {
  room_id: number;
  hotel_id: number;
  price: number;
  capacity: string;
  view_type: string;
  is_extendable: boolean;
}

interface Customer {
  customer_id: number;
  full_name: string;
  address: string;
  id_type: string;
  id_number: string;
  registration_date: string;
}

interface Renting {
  renting_id: number;
  booking_id: number | null;
  customer_id: number;
  room_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
}

const RentingPage: React.FC = () => {
  const [role, setRole] = useState<'customer' | 'employee'>('customer');
  const [rentings, setRentings] = useState<Renting[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useState({
    start_date: '',
    end_date: ''
  });
  const [paymentData, setPaymentData] = useState({
    amount: '',
    method: 'CreditCard'
  });
  const [selectedRenting, setSelectedRenting] = useState<Renting | null>(null);

  // Fetch data based on role
  useEffect(() => {
    if (role === 'employee') {
      getRentings().then(res => setRentings(res));
      getCustomers().then(res => setCustomers(res));
    } else {
      setRentings([]);
      setCustomers([]);
    }
  }, [role]);

  const handleSearch = () => {
    if (!searchParams.start_date || !searchParams.end_date) {
      alert('Please select both start and end dates');
      return;
    }
    
    searchRooms({
      start_date: searchParams.start_date,
      end_date: searchParams.end_date
    })
    .then(res => setRooms(res.data))
    .catch(err => {
      console.error(err);
      alert('Error searching for rooms. Please check your dates.');
    });
  };

  const handleCreateBooking = (roomId: number) => {
    createBooking({
      customer_id: 1, // In a real app, this would be the logged-in customer's ID
      room_id: roomId,
      check_in_date: searchParams.start_date,
      check_out_date: searchParams.end_date,
      status: 'active'
    })
    .then(res => {
      alert('Booking created successfully!');
      setRooms([]);
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.detail || 'Error creating booking');
    });
  };

  const handleCreateRenting = (roomId: number) => {
    if (!selectedCustomer) {
      alert('Please select a customer first');
      return;
    }
    
    checkInPerson({
      customer_id: selectedCustomer,
      room_id: roomId,
      employee_id: 1, // In a real app, this would be the logged-in employee's ID
      start_date: searchParams.start_date,
      end_date: searchParams.end_date
    })
    .then(res => {
      setRentings(prev => [...prev, res]);
      alert('Renting created successfully!');
      setRooms([]);
    })
    .catch(err => {
      console.error(err);
      alert(err.response?.data?.detail || 'Error creating renting');
    });
  };

  const handlePaymentSubmit = () => {
    if (!selectedRenting || !paymentData.amount) {
      alert('Please select a renting and enter payment amount');
      return;
    }
    
    // Here you would call your payment API
    console.log('Payment submitted:', {
      renting_id: selectedRenting.renting_id,
      amount: paymentData.amount,
      method: paymentData.method
    });
    alert('Payment processed successfully!');
    setPaymentData({ amount: '', method: 'CreditCard' });
    setSelectedRenting(null);
  };

  return (
    <Box className="renting-page">
      <Typography variant="h5" gutterBottom>
        Renting Management
      </Typography>

      {/* Role selection */}
      <Box sx={{ mb: 3 }}>
        <StyledButton 
          variant={role === 'customer' ? "contained" : "outlined"} 
          onClick={() => setRole('customer')}
          sx={{ mr: 2 }}
        >
          Customer View
        </StyledButton>
        <StyledButton 
          variant={role === 'employee' ? "contained" : "outlined"} 
          onClick={() => setRole('employee')}
        >
          Employee View
        </StyledButton>
      </Box>

      {/* Common search form */}
      <Paper className="search-form" elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Search for Available Rooms
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchParams.start_date}
              onChange={(e) => setSearchParams({...searchParams, start_date: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={searchParams.end_date}
              onChange={(e) => setSearchParams({...searchParams, end_date: e.target.value})}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton onClick={handleSearch}>
              SEARCH ROOMS
            </StyledButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Customer-specific view */}
      {role === 'customer' && rooms.length > 0 && (
        <Paper elevation={1} className="room-list-paper" sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Available Rooms
          </Typography>
          <ul className="room-list">
            {rooms.map(room => (
              <li key={room.room_id}>
                <div>
                  <strong>Room #{room.room_id}</strong>
                  <br />
                  Hotel: {room.hotel_id} | Price: ${room.price} | Capacity: {room.capacity}
                  <br />
                  View: {room.view_type} | Extendable: {room.is_extendable ? 'Yes' : 'No'}
                </div>
                <div>
                  <StyledButton 
                    variant="text" 
                    onClick={() => handleCreateBooking(room.room_id)}
                  >
                    Book Now
                  </StyledButton>
                </div>
              </li>
            ))}
          </ul>
        </Paper>
      )}

      {/* Employee-specific view */}
      {role === 'employee' && (
        <>
          {/* Customer selection for employees */}
          {customers.length > 0 && (
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Select Customer
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  value={selectedCustomer || ''}
                  onChange={(e) => setSelectedCustomer(Number(e.target.value))}
                  label="Customer"
                >
                  {customers.map(customer => (
                    <MenuItem key={customer.customer_id} value={customer.customer_id}>
                      {customer.full_name} (ID: {customer.customer_id})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          )}

          {/* Available rooms for employees */}
          {rooms.length > 0 && (
            <Paper elevation={1} className="room-list-paper" sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Available Rooms for Direct Renting
              </Typography>
              <ul className="room-list">
                {rooms.map(room => (
                  <li key={room.room_id}>
                    <div>
                      <strong>Room #{room.room_id}</strong>
                      <br />
                      Hotel: {room.hotel_id} | Price: ${room.price} | Capacity: {room.capacity}
                      <br />
                      View: {room.view_type} | Extendable: {room.is_extendable ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <StyledButton 
                        variant="text" 
                        onClick={() => handleCreateRenting(room.room_id)}
                      >
                        Rent Directly
                      </StyledButton>
                    </div>
                  </li>
                ))}
              </ul>
            </Paper>
          )}

          {/* Active rentings */}
          <Paper elevation={1} className="renting-list-paper" sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Active Rentings
            </Typography>
            {rentings.length > 0 ? (
              <ul className="renting-list">
                {rentings.map(renting => (
                  <li key={renting.renting_id}>
                    <div>
                      <strong>Renting #{renting.renting_id}</strong>
                      <br />
                      Room: {renting.room_id} | Customer: {renting.customer_id}
                      <br />
                      Dates: {new Date(renting.start_date).toLocaleDateString()} to {new Date(renting.end_date).toLocaleDateString()}
                    </div>
                    <div>
                      <StyledButton 
                        variant="text" 
                        onClick={() => setSelectedRenting(renting)}
                      >
                        Process Payment
                      </StyledButton>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2">No active rentings found.</Typography>
            )}
          </Paper>

          {/* Payment form */}
          {selectedRenting && (
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Process Payment for Renting #{selectedRenting.renting_id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Amount"
                    type="number"
                    value={paymentData.amount}
                    onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Payment Method</InputLabel>
                    <Select
                      value={paymentData.method}
                      label="Payment Method"
                      onChange={(e) => setPaymentData({...paymentData, method: e.target.value})}
                    >
                      <MenuItem value="CreditCard">Credit Card</MenuItem>
                      <MenuItem value="DebitCard">Debit Card</MenuItem>
                      <MenuItem value="Cash">Cash</MenuItem>
                      <MenuItem value="Check">Check</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton onClick={handlePaymentSubmit}>
                    SUBMIT PAYMENT
                  </StyledButton>
                </Grid>
              </Grid>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default RentingPage;