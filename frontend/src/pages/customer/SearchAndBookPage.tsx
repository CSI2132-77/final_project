import React, { useState, useEffect } from 'react';
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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import { searchRooms, createBooking, getCustomers } from '../../api/index';
import StyledButton from '../../components/StyledButton';
import './SearchAndBookPage.css';

interface Room {
  room_id: number;
  hotel_id: number;
  price: string;
  capacity: string;
  view_type: string;
  is_extendable: boolean;
}

interface Customer {
  customer_id: number;
  full_name: string;
  email?: string;
  phone_number?: string;
}

interface BookingData {
  customer_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  status?: 'active' | 'canceled' | 'completed';
}

interface ApiError {
  response?: {
    status?: number;
    data?: {
      detail?: string;
      message?: string;
    };
  };
  message?: string;
}

const SearchAndBookPage: React.FC = () => {
  // Set default dates (today and tomorrow)
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const [criteria, setCriteria] = useState({
    checkIn: today,
    checkOut: tomorrowStr,
    capacity: 'single',
    area: '',
    hotelChain: '',
    category: '',
    priceRange: [0, 1000] as [number, number],
  });
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [message, setMessage] = useState<{text: string; severity: 'success' | 'error' | 'info'} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isFetchingCustomers, setIsFetchingCustomers] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      setIsFetchingCustomers(true);
      try {
        const response = await getCustomers();
        setCustomers(response.data);
        if (response.data.length > 0) {
          setSelectedCustomer(response.data[0].customer_id);
        }
      } catch (err: unknown) {
        const error = err as ApiError;
        console.error('Error fetching customers:', error);
        setMessage({
          text: 'Failed to load customers. Please try again later.',
          severity: 'error'
        });
      } finally {
        setIsFetchingCustomers(false);
      }
    };
    fetchCustomers();
  }, []);

  const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
    setCriteria({ ...criteria, priceRange: newValue as [number, number] });
  };

  const validateDates = () => {
    if (!criteria.checkIn || !criteria.checkOut) {
      setMessage({text: 'Please select both check-in and check-out dates', severity: 'error'});
      return false;
    }
    
    const checkInDate = new Date(criteria.checkIn);
    const checkOutDate = new Date(criteria.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      setMessage({text: 'Check-in date cannot be in the past', severity: 'error'});
      return false;
    }
    
    if (checkOutDate <= checkInDate) {
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
        ...(criteria.capacity && { capacity: criteria.capacity }),
        ...(criteria.area && { address: criteria.area }),
        ...(criteria.hotelChain && { chain_id: criteria.hotelChain }),
        ...(criteria.category && { category: criteria.category }),
        price: criteria.priceRange[1]
      };

      const response = await searchRooms(params);

      if (Array.isArray(response.data)) {
        setRooms(response.data);
        setMessage({
          text: `Found ${response.data.length} available rooms`,
          severity: response.data.length ? 'success' : 'info'
        });
      } else {
        setMessage({
          text: 'No rooms found matching your criteria',
          severity: 'info'
        });
        setRooms([]);
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error('Search error:', error);
      
      let errorMessage = 'Failed to search rooms. Please try again.';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'No rooms found matching your criteria.';
        } else if (error.response.status === 422) {
          errorMessage = 'Invalid search parameters. Please check your inputs.';
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
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

  const handleBookNowClick = (room: Room) => {
    if (!selectedCustomer) {
      setMessage({
        text: 'Please select a customer first',
        severity: 'error'
      });
      return;
    }
    setSelectedRoom(room);
    setShowBookingDialog(true);
  };

  const confirmBooking = async () => {
    if (!selectedRoom || !selectedCustomer || !criteria.checkIn || !criteria.checkOut) return;

    setIsBooking(true);
    try {
      const bookingData: BookingData = {
        customer_id: selectedCustomer,
        room_id: selectedRoom.room_id,
        check_in_date: criteria.checkIn,
        check_out_date: criteria.checkOut,
        status: 'active'
      };

      const bookingResponse = await createBooking(bookingData);
      
      setMessage({
        text: `Booking successful! ID: ${bookingResponse.booking_id}`,
        severity: 'success'
      });

      // Refresh available rooms
      await handleSearch();
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error('Booking error:', error);
      
      let errorMessage = 'Booking failed. Please try again.';
      if (error.response) {
        if (error.response.status === 404) {
          errorMessage = 'Room no longer available.';
        } else if (error.response.status === 422) {
          errorMessage = 'Invalid booking parameters.';
        } else if (error.response.data?.detail) {
          errorMessage = error.response.data.detail;
        }
      }

      setMessage({
        text: errorMessage,
        severity: 'error'
      });
    } finally {
      setIsBooking(false);
      setShowBookingDialog(false);
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
              inputProps={{ min: today }}
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
              inputProps={{ min: tomorrowStr }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Customer"
              value={selectedCustomer || ''}
              onChange={(e) => setSelectedCustomer(Number(e.target.value))}
              fullWidth
              disabled={isFetchingCustomers || customers.length === 0}
            >
              {isFetchingCustomers ? (
                <MenuItem value="">Loading customers...</MenuItem>
              ) : customers.length > 0 ? (
                customers.map((customer) => (
                  <MenuItem key={customer.customer_id} value={customer.customer_id}>
                    {customer.full_name} (ID: {customer.customer_id})
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No customers available</MenuItem>
              )}
            </TextField>
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
              onChange={(e) => setCriteria({ ...criteria, area: e.target.value.trim() })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Hotel Chain ID"
              placeholder="Chain ID"
              value={criteria.hotelChain}
              onChange={(e) => setCriteria({ ...criteria, hotelChain: e.target.value.trim() })}
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
                      onClick={() => handleBookNowClick(room)}
                      disabled={isLoading || !selectedCustomer}
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
        !isLoading && (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="body1">
              No rooms available. Please adjust your search criteria.
            </Typography>
          </Paper>
        )
      )}

      {/* Booking Confirmation Dialog */}
      <Dialog open={showBookingDialog} onClose={() => setShowBookingDialog(false)}>
        <DialogTitle>Confirm Booking</DialogTitle>
        <DialogContent>
          {selectedRoom && selectedCustomer && (
            <>
              <Typography variant="h6" gutterBottom>
                Booking Details
              </Typography>
              <Typography gutterBottom>
                <strong>Customer:</strong> {
                  customers.find(c => c.customer_id === selectedCustomer)?.full_name || `ID: ${selectedCustomer}`
                }
              </Typography>
              <Typography gutterBottom>
                <strong>Room:</strong> #{selectedRoom.room_id}
              </Typography>
              <Typography gutterBottom>
                <strong>Hotel:</strong> #{selectedRoom.hotel_id}
              </Typography>
              <Typography gutterBottom>
                <strong>Price:</strong> {formatPrice(selectedRoom.price)}
              </Typography>
              <Typography gutterBottom>
                <strong>Dates:</strong> {criteria.checkIn} to {criteria.checkOut}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBookingDialog(false)} disabled={isBooking}>
            Cancel
          </Button>
          <Button 
            onClick={confirmBooking}
            disabled={isBooking}
            variant="contained"
            color="primary"
            startIcon={isBooking ? <CircularProgress size={20} /> : null}
          >
            {isBooking ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchAndBookPage;