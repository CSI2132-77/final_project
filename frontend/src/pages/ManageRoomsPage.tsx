import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Grid, Paper, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import StyledButton from '../components/StyledButton';
import './ManageRoomsPage.css';

const API_BASE_URL = 'http://localhost:8000';

interface Room {
  room_id: number;
  hotel_id: number;
  price: number;
  capacity: string;
  view_type: string;
  is_extendable: boolean;
}

const ManageRoomsPage: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [newRoom, setNewRoom] = useState({
    hotel_id: '',
    price: '',
    capacity: '',
    view_type: '',
    is_extendable: false,
  });
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  useEffect(() => {
    axios.get('/api/room')
      .then((res) => setRooms(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleAddRoom = () => {
    const roomToAdd = {
      hotel_id: Number(newRoom.hotel_id),
      price: Number(newRoom.price),
      capacity: newRoom.capacity,
      view_type: newRoom.view_type,
      is_extendable: newRoom.is_extendable
    };
  
    axios.post('/api/room/add', roomToAdd)
      .then((res) => {
        setRooms(prev => [...prev, res.data]);
        setNewRoom({ 
          hotel_id: '', 
          price: '', 
          capacity: '', 
          view_type: '', 
          is_extendable: false 
        });
      })
      .catch((err) => {
        console.error("Error adding room:", err);
      });
  };

  const handleDeleteRoom = (roomId: number) => {
    axios.delete(`${API_BASE_URL}/room/delete`, {
      data: { room_id: roomId } 
    })
    .then(() => {
      setRooms(prev => prev.filter(r => r.room_id !== roomId));
    })
    .catch((err) => {
      console.error("Delete error:", err.response?.data || err.message);
      alert(`Delete failed: ${err.response?.data?.message || err.message}`);
    });
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
  };

  const handleUpdateRoom = () => {
    if (!editingRoom) return;
    
    const updateData = {
      room_id: editingRoom.room_id,
      hotel_id: editingRoom.hotel_id,
      price: editingRoom.price,
      capacity: editingRoom.capacity,
      view_type: editingRoom.view_type,
      is_extendable: editingRoom.is_extendable
    };
  
    axios.patch(`${API_BASE_URL}/room/update`, updateData)
      .then((res) => {
        setRooms(prev => prev.map(r => 
          r.room_id === editingRoom.room_id ? res.data : r
        ));
        setEditingRoom(null);
      })
      .catch((err) => {
        console.error("Update error:", err.response?.data || err.message);
        alert(`Update failed: ${err.response?.data?.message || err.message}`);
      });
  };

  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  return (
    <Box className="manage-rooms">
      <Typography variant="h5" gutterBottom>
        Manage Rooms
      </Typography>

      {/* Add Room Form */}
      <Paper className="room-form" elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Hotel ID"
                type="number"
                value={newRoom.hotel_id}
                onChange={(e) => setNewRoom({ ...newRoom, hotel_id: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Price"
                type="number"
                value={newRoom.price}
                onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Capacity"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({ ...newRoom, capacity: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="View Type"
                value={newRoom.view_type}
                onChange={(e) => setNewRoom({ ...newRoom, view_type: e.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newRoom.is_extendable}
                    onChange={(e) => setNewRoom({ ...newRoom, is_extendable: e.target.checked })}
                  />
                }
                label="Extendable"
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton onClick={handleAddRoom}>
                ADD ROOM
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Room List */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Room List
        </Typography>
        <Paper elevation={1} className="room-list-paper">
          <ul className="room-list">
            {rooms.map(r => (
              <li key={r.room_id}>
                {editingRoom && editingRoom.room_id === r.room_id ? (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                    <TextField
                      label="Hotel ID"
                      type="number"
                      value={editingRoom.hotel_id}
                      onChange={(e) => setEditingRoom({ ...editingRoom, hotel_id: Number(e.target.value) })}
                      size="small"
                    />
                    <TextField
                      label="Price"
                      type="number"
                      value={editingRoom.price}
                      onChange={(e) => setEditingRoom({ ...editingRoom, price: Number(e.target.value) })}
                      size="small"
                    />
                    <TextField
                      label="Capacity"
                      value={editingRoom.capacity}
                      onChange={(e) => setEditingRoom({ ...editingRoom, capacity: e.target.value })}
                      size="small"
                    />
                    <TextField
                      label="View Type"
                      value={editingRoom.view_type}
                      onChange={(e) => setEditingRoom({ ...editingRoom, view_type: e.target.value })}
                      size="small"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={editingRoom.is_extendable}
                          onChange={(e) => setEditingRoom({ ...editingRoom, is_extendable: e.target.checked })}
                          size="small"
                        />
                      }
                      label="Extendable"
                    />
                    <StyledButton onClick={handleUpdateRoom} size="small">
                      Update
                    </StyledButton>
                    <StyledButton 
                      variant="outlined" 
                      onClick={handleCancelEdit}
                      size="small"
                    >
                      Cancel
                    </StyledButton>
                  </Box>
                ) : (
                  <>
                    <div>
                      <strong>Room #{r.room_id}</strong>
                      <br />
                      Hotel: {r.hotel_id} | Price: ${r.price} | Capacity: {r.capacity}
                      <br />
                      View: {r.view_type} | Extendable: {r.is_extendable ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <StyledButton 
                        variant="text" 
                        onClick={() => handleEditRoom(r)}
                        size="small"
                      >
                        Edit
                      </StyledButton>
                      <StyledButton 
                        variant="text" 
                        color="error" 
                        onClick={() => handleDeleteRoom(r.room_id)}
                        size="small"
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

export default ManageRoomsPage;