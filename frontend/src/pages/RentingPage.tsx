import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';
import './RentingPage.css';

interface Renting {
  renting_id: number;
  booking_id: number | null;
  customer_id: number;
  room_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
}

function RentingPage() {
  // Role state: either "customer" or "employee"
  const [role, setRole] = useState<'customer' | 'employee'>('customer');
  // List of active rentings (for employees)
  const [rentings, setRentings] = useState<Renting[]>([]);
  // The renting record selected for payment insertion
  const [selectedRenting, setSelectedRenting] = useState<Renting | null>(null);
  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (role === 'employee') {
      // Fetch active rentings from backend
      axios.get('/api/rentings')
        .then((res) => setRentings(res.data))
        .catch((err) => console.error(err));
    }
  }, [role]);

  const handleRoleChange = (newRole: 'customer' | 'employee') => {
    setRole(newRole);
    setSelectedRenting(null);
  };

  const handlePaymentSubmit = () => {
    if (!selectedRenting) return;
    const payload = {
      renting_id: selectedRenting.renting_id,
      amount: parseFloat(paymentAmount),
      payment_method: paymentMethod
    };
    axios.post('/api/payments', payload)
      .then((res) => {
        console.log('Payment inserted', res.data);
        setPaymentAmount('');
        setPaymentMethod('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <Box className="renting-page">
      <Typography variant="h5" gutterBottom>
        Renting Management
      </Typography>
      
      {/* Role selection buttons */}
      <Box sx={{ mb: 2 }}>
        <Button variant={role === 'customer' ? "contained" : "outlined"} onClick={() => handleRoleChange('customer')} sx={{ mr: 2 }}>
          Customer
        </Button>
        <Button variant={role === 'employee' ? "contained" : "outlined"} onClick={() => handleRoleChange('employee')}>
          Employee
        </Button>
      </Box>

      {role === 'customer' ? (
        <Typography variant="body1">
          Customer view: Here you would search for rooms and make bookings.
        </Typography>
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            Employee view: Convert booking to renting or process direct renting.
          </Typography>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Active Rentings</Typography>
            {rentings.length > 0 ? (
              <ul className="renting-list">
                {rentings.map((r) => (
                  <li key={r.renting_id} onClick={() => setSelectedRenting(r)}>
                    Renting ID: {r.renting_id}, Room: {r.room_id}, Customer: {r.customer_id}, 
                    Start: {r.start_date}, End: {r.end_date}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography variant="body2">No active rentings found.</Typography>
            )}
          </Paper>
          {selectedRenting && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">
                Insert Payment for Renting #{selectedRenting.renting_id}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Payment Amount"
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Payment Method"
                    placeholder="e.g., CreditCard, Cash"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handlePaymentSubmit}>
                    Submit Payment
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
        </>
      )}
    </Box>
  );
}

export default RentingPage;
