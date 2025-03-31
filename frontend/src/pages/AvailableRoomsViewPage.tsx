import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import axios from 'axios';

function AvailableRoomsViewPage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('/api/view/available-rooms')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Available Rooms Per Area
      </Typography>
      <table>
        <thead>
          <tr>
            <th>Area</th>
            <th>Available Rooms</th>
            <th>Min Price</th>
            <th>Max Price</th>
            <th>Avg Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.area}</td>
              <td>{row.available_rooms}</td>
              <td>{row.min_price}</td>
              <td>{row.max_price}</td>
              <td>{row.avg_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AvailableRoomsViewPage;