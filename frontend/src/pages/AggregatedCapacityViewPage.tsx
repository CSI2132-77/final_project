import { useEffect, useState } from 'react';
import { Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import axios from 'axios';
import './AggregatedCapacityViewPage.css';

// import { API_BASE_URL } from '../apiConfig';
// axios.get(`${API_BASE_URL}/rooms/search`, { params });


interface CapacityData {
  hotel_id: number;
  address: string;
  category: number;
  total_rooms: number;
  single_rooms: number;
  double_rooms: number;
  suite_rooms: number;
}

function AggregatedCapacityViewPage() {
  const [data, setData] = useState<CapacityData[]>([]);

  useEffect(() => {
    axios.get('/api/view/aggregated-capacity')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="capacity-view">
      <Typography variant="h5" gutterBottom>
        Aggregated Room Capacity
      </Typography>
      <TableContainer component={Paper}>
        <Table className="capacity-table">
          <TableHead>
            <TableRow>
              <TableCell>Hotel ID</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Total Rooms</TableCell>
              <TableCell>Single</TableCell>
              <TableCell>Double</TableCell>
              <TableCell>Suite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.hotel_id}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.total_rooms}</TableCell>
                <TableCell>{row.single_rooms}</TableCell>
                <TableCell>{row.double_rooms}</TableCell>
                <TableCell>{row.suite_rooms}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AggregatedCapacityViewPage;
