// src/views/AggregatedCapacityView.tsx
import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper,
  CircularProgress,
  Box
} from '@mui/material';
import { fetchHotelRoomCapacity } from '../api/index';

const AggregatedCapacityView = () => {
  const [data, setData] = useState<HotelRoomCapacity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const capacityData = await fetchHotelRoomCapacity();
        setData(capacityData);
      } catch (err) {
        setError('Failed to fetch hotel room capacity data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" gutterBottom>
        {error}
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Hotel Room Capacity
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Hotel ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Total Rooms</TableCell>
              <TableCell align="right">Single</TableCell>
              <TableCell align="right">Double</TableCell>
              <TableCell align="right">Suite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.hotel_id} hover>
                <TableCell>{row.hotel_id}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="right">{row.total_rooms}</TableCell>
                <TableCell align="right">{row.single_rooms}</TableCell>
                <TableCell align="right">{row.double_rooms}</TableCell>
                <TableCell align="right">{row.suite_rooms}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AggregatedCapacityView;