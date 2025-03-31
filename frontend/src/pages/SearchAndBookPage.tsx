import React, { useState } from 'react';
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Slider,
  CircularProgress,
  Alert,
  AlertTitle,
  Chip
} from '@mui/material';
import { searchRooms } from '../api/index';
import StyledButton from '../components/StyledButton';
import './SearchAndBookPage.css';

interface Room {
  room_id: number;
  hotel_id: number;
  price: string;
  capacity: string;
  view_type: string;
  is_extendable: boolean;
}

const SearchAndBookPage: React.FC = () => {
  const [criteria, setCriteria] = useState({
    checkIn: '',
    checkOut: '',
    capacity: 'single',
    area: '',
    hotelChain: '',
    category: '',
    priceRange: [0, 1000] as [number, number],
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [message, setMessage] = useState<{text: string; severity: 'success' | 'error' | 'info'} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setCriteria({ ...criteria, priceRange: newValue as [number, number] });
  };

  const validateDates = () => {
    if (!criteria.checkIn || !criteria.checkOut) {
      setMessage({text: 'Please select both check-in and check-out dates', severity: 'error'});
      return false;
    }
    if (new Date(criteria.checkOut) <= new Date(criteria.checkIn)) {
      setMessage({text: 'Check-out date must be after check-in date', severity: 'error'});
      return false;
    }
    return true;
  };

  const handleSearch = async () => {
    if (!validateDates()) return;

    setIsLoading(true);
    setMessage(null);
    try {
      const params = {
        start_date: criteria.checkIn,
        end_date: criteria.checkOut,
        capacity: criteria.capacity,
        address: criteria.area,
        chain_id: criteria.hotelChain,
        category: criteria.category,
        price: criteria.priceRange[1] // Using max price as per your backend
      };

      // Remove undefined parameters
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      );

      const response = await searchRooms(cleanedParams);

      // Handle both array and error responses
      if (Array.isArray(response.data)) {
        setRooms(response.data);
        setMessage({
          text: `Found ${response.data.length} available rooms`,
          severity: 'success'
        });
      } else {
        // Handle error cases
        setMessage({
          text: 'No rooms found matching your criteria',
          severity: 'info'
        });
        setRooms([]);
      }
    } catch (err: any) {
      console.error('Search error:', err);
      
      let errorMessage = 'Failed to search rooms. Please try again.';
      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = 'No rooms found matching your criteria.';
        } else if (err.response.status === 422) {
          errorMessage = 'Invalid search parameters. Please check your inputs.';
        } else if (err.response.data?.detail) {
          errorMessage = err.response.data.detail;
        }
      }

      setMessage({
        text: errorMessage,
        severity: 'error'
      });
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(parseFloat(price));
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Box className="search-and-book-page">
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Search and Book a Room
      </Typography>

      {/* Search Form */}
      <Paper className="search-form" sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Check-in Date"
              type="date"
              value={criteria.checkIn}
              onChange={(e) => setCriteria({ ...criteria, checkIn: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Check-out Date"
              type="date"
              value={criteria.checkOut}
              onChange={(e) => setCriteria({ ...criteria, checkOut: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Room Capacity"
              value={criteria.capacity}
              onChange={(e) => setCriteria({ ...criteria, capacity: e.target.value })}
              fullWidth
            >
              <MenuItem value="single">Single</MenuItem>
              <MenuItem value="double">Double</MenuItem>
              <MenuItem value="suite">Suite</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Location"
              placeholder="City or address"
              value={criteria.area}
              onChange={(e) => setCriteria({ ...criteria, area: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Hotel Chain ID"
              placeholder="Chain ID"
              value={criteria.hotelChain}
              onChange={(e) => setCriteria({ ...criteria, hotelChain: e.target.value })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Hotel Category"
              value={criteria.category}
              onChange={(e) => setCriteria({ ...criteria, category: e.target.value })}
              fullWidth
            >
              <MenuItem value="">Any</MenuItem>
              {[1, 2, 3, 4, 5].map((num) => (
                <MenuItem key={num} value={num.toString()}>
                  {num} Star
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography gutterBottom>
              Price Range: {formatPrice(criteria.priceRange[0].toString())} - {formatPrice(criteria.priceRange[1].toString())}
            </Typography>
            <Slider
              value={criteria.priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={10}
              valueLabelFormat={(value) => formatPrice(value.toString())}
            />
          </Grid>
          <Grid item xs={12}>
            <StyledButton
              onClick={handleSearch}
              disabled={isLoading}
              variant="contained"
              fullWidth
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Searching...' : 'Search Available Rooms'}
            </StyledButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Messages */}
      {message && (
        <Alert severity={message.severity} sx={{ mb: 3 }}>
          <AlertTitle>
            {message.severity === 'error' ? 'Error' : 
             message.severity === 'success' ? 'Success' : 'Info'}
          </AlertTitle>
          {message.text}
        </Alert>
      )}

      {/* Results */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Available Rooms
      </Typography>

      {isLoading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : rooms.length > 0 ? (
        <Grid container spacing={2}>
          {rooms.map((room) => (
            <Grid item xs={12} key={room.room_id}>
              <Paper sx={{ p: 3 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                      Room #{room.room_id}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Hotel:</strong> #{room.hotel_id}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
                      <Chip label={`Capacity: ${capitalize(room.capacity)}`} />
                      <Chip label={`View: ${capitalize(room.view_type)}`} />
                      <Chip label={`Extendable: ${room.is_extendable ? 'Yes' : 'No'}`} />
                      <Chip label={`Price: ${formatPrice(room.price)}`} color="primary" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: { md: 'right' } }}>
                    <StyledButton 
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Book Now
                    </StyledButton>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1">
            No rooms available. Please adjust your search criteria.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default SearchAndBookPage;