import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import axios from 'axios';
import './BookingsPage.css';

const BookingsPage: React.FC = () => {
  // Search form state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [capacity, setCapacity] = useState('single');
  const [area, setArea] = useState('');
  const [hotelChain, setHotelChain] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  // Results state for available rooms
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  // Message to show booking confirmation or errors
  const [bookingMessage, setBookingMessage] = useState('');

  // Handle search - call backend API with query parameters
  const handleSearch = () => {
    const params = {
      checkIn,
      checkOut,
      capacity,
      area,
      hotelChain,
      category,
      priceRange,
    };
    axios
      .get('/api/rooms/search', { params })
      .then((res) => {
        setAvailableRooms(res.data);
        setBookingMessage('');
      })
      .catch((err) => {
        console.error(err);
        setBookingMessage('Error fetching available rooms.');
      });
  };

  // Handle booking of a room
  const handleBookNow = (room: any) => {
    // Construct payload: adjust according to your API requirements.
    const payload = {
      customer_id: 1, // Replace with actual customer id (or from session)
      room_id: room.room_id,
      check_in_date: checkIn,
      check_out_date: checkOut,
    };
    axios
      .post('/api/bookings', payload)
      .then((res) => {
        setBookingMessage(
          `Booking confirmed for Room ${room.room_id} (Booking ID: ${res.data.booking_id}).`
        );
        // Optionally, remove booked room from available list
        setAvailableRooms((prev) =>
          prev.filter((r) => r.room_id !== room.room_id)
        );
      })
      .catch((err) => {
        console.error(err);
        setBookingMessage('Error creating booking.');
      });
  };

  return (
    <Box className="bookings-page">
      <Typography variant="h5" gutterBottom>
        Create a Booking
      </Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Check-in Date"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Check-out Date"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              fullWidth
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="double">Double</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Area"
              placeholder="City or region"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Hotel Chain"
              placeholder="Chain name"
              value={hotelChain}
              onChange={(e) => setHotelChain(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Category"
              placeholder="1-5"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Price Range"
              placeholder="e.g. 100-300"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search Available Rooms
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {bookingMessage && (
        <Typography variant="body1" color="primary" sx={{ mb: 2 }}>
          {bookingMessage}
        </Typography>
      )}
      <Typography variant="h6" gutterBottom>
        Available Rooms
      </Typography>
      {availableRooms.length > 0 ? (
        <ul className="rooms-list">
          {availableRooms.map((room) => (
            <li key={room.room_id}>
              {room.hotelName} - {room.capacity} - ${room.price} - {room.view_type}
              <Button
                variant="text"
                color="primary"
                onClick={() => handleBookNow(room)}
                sx={{ ml: 2 }}
              >
                Book Now
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body2">
          No rooms available. Please adjust your search criteria.
        </Typography>
      )}
    </Box>
  );
};

export default BookingsPage;
