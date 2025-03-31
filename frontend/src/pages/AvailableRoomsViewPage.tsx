import { useEffect, useState } from 'react';
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
  Box,
  Alert,
  Button
} from '@mui/material';
import { fetchAvailableRoomsPerArea } from '../api/index';

const AvailableRoomsView = () => {
  const [areas, setAreas] = useState<AvailableRoomsPerArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAvailableRoomsPerArea();
      setAreas(data);
    } catch (err) {
      setError('Failed to fetch available rooms data. Please try again later.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
        <Button onClick={loadData} sx={{ ml: 2 }}>Retry</Button>
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Available Rooms Per Area
      </Typography>
      
      {areas.length === 0 ? (
        <Typography variant="body1">No available rooms found in any area.</Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Area (Address)</TableCell>
                <TableCell align="right">Available Rooms</TableCell>
                <TableCell align="right">Min Price ($)</TableCell>
                <TableCell align="right">Max Price ($)</TableCell>
                <TableCell align="right">Avg Price ($)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {areas.map((area) => (
                <TableRow key={area.area} hover>
                  <TableCell>{area.area}</TableCell>
                  <TableCell align="right">{area.available_rooms}</TableCell>
                  <TableCell align="right">{area.min_price.toFixed(2)}</TableCell>
                  <TableCell align="right">{area.max_price.toFixed(2)}</TableCell>
                  <TableCell align="right">{area.avg_price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AvailableRoomsView;