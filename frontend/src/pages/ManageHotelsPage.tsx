import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Grid, Paper } from '@mui/material';
import { 
  getHotels, 
  createHotel, 
  updateHotel, 
  deleteHotel 
} from '../api';
import StyledButton from '../components/StyledButton';
import './ManageHotelsPage.css';

interface Hotel {
  hotel_id: number;
  chain_id: number;
  address: string;
  category: number;
}

const ManageHotelsPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [newHotel, setNewHotel] = useState<Omit<Hotel, 'hotel_id'>>({
    chain_id: 0,
    address: '',
    category: 0
  });
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await getHotels();
      setHotels(response.data);
    } catch (err) {
      console.error('Error fetching hotels:', err);
    }
  };

  const handleAddHotel = async () => {
    try {
      const response = await createHotel({
        chain_id: Number(newHotel.chain_id),
        address: newHotel.address,
        category: Number(newHotel.category)
      });
      setHotels(prev => [...prev, response.data]);
      setNewHotel({ 
        chain_id: 0, 
        address: '', 
        category: 0 
      });
    } catch (err) {
      console.error('Error adding hotel:', err);
    }
  };

  const handleDeleteHotel = async (id: number) => {
    try {
      await deleteHotel({ hotel_id: id });
      setHotels(prev => prev.filter(h => h.hotel_id !== id));
    } catch (err) {
      console.error('Error deleting hotel:', err);
    }
  };

  const handleEditHotel = (hotel: Hotel) => {
    setEditingHotel(hotel);
  };

  const handleUpdateHotel = async () => {
    if (!editingHotel) return;
    try {
      const response = await updateHotel({
        hotel_id: editingHotel.hotel_id,
        chain_id: editingHotel.chain_id,
        address: editingHotel.address,
        category: editingHotel.category
      });
      setHotels(prev =>
        prev.map(h =>
          h.hotel_id === editingHotel.hotel_id ? response.data : h
        )
      );
      setEditingHotel(null);
    } catch (err) {
      console.error('Error updating hotel:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingHotel(null);
  };

  return (
    <Box className="manage-hotels">
      <Typography variant="h5" gutterBottom>
        Manage Hotels
      </Typography>

      {/* Add Hotel Form */}
      <Paper className="hotel-form" elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                label="Chain ID"
                type="number"
                value={newHotel.chain_id || ''}
                onChange={(e) => setNewHotel({ 
                  ...newHotel, 
                  chain_id: parseInt(e.target.value) || 0 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Address"
                value={newHotel.address}
                onChange={(e) => setNewHotel({ 
                  ...newHotel, 
                  address: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Category (1-5)"
                type="number"
                inputProps={{ min: 1, max: 5 }}
                value={newHotel.category || ''}
                onChange={(e) => setNewHotel({ 
                  ...newHotel, 
                  category: parseInt(e.target.value) || 0 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton 
                onClick={handleAddHotel}
              >
                ADD HOTEL
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Hotel List */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Hotel List
        </Typography>
        <Paper elevation={1} className="hotel-list-paper">
          <ul className="hotel-list">
            {hotels.map((hotel) => (
              <li key={hotel.hotel_id}>
                {editingHotel?.hotel_id === hotel.hotel_id ? (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      label="Chain ID"
                      type="number"
                      value={editingHotel.chain_id}
                      onChange={(e) => setEditingHotel({ 
                        ...editingHotel, 
                        chain_id: parseInt(e.target.value) || 0 
                      })}
                    />
                    <TextField
                      label="Address"
                      value={editingHotel.address}
                      onChange={(e) => setEditingHotel({ 
                        ...editingHotel, 
                        address: e.target.value 
                      })}
                    />
                    <TextField
                      label="Category"
                      type="number"
                      inputProps={{ min: 1, max: 5 }}
                      value={editingHotel.category}
                      onChange={(e) => setEditingHotel({ 
                        ...editingHotel, 
                        category: parseInt(e.target.value) || 0 
                      })}
                    />
                    <StyledButton onClick={handleUpdateHotel}>
                      Update
                    </StyledButton>
                    <StyledButton 
                      variant="outlined" 
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </StyledButton>
                  </Box>
                ) : (
                  <>
                    <div>
                      <strong>Hotel #{hotel.hotel_id}</strong>
                      <br />
                      Chain: {hotel.chain_id} | Category: {hotel.category}
                      <br />
                      Address: {hotel.address}
                    </div>
                    <div>
                      <StyledButton 
                        variant="text" 
                        onClick={() => handleEditHotel(hotel)}
                      >
                        Edit
                      </StyledButton>
                      <StyledButton 
                        variant="text" 
                        color="error" 
                        onClick={() => handleDeleteHotel(hotel.hotel_id)}
                      >
                        Delete
                      </StyledButton>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </Paper>
      </Box>
    </Box>
  );
};

export default ManageHotelsPage;