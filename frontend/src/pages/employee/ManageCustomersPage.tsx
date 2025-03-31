import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Grid, Paper } from '@mui/material';
import { 
  getCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer 
} from '../../api';
import StyledButton from '../../components/StyledButton';
import './ManageCustomersPage.css';

interface Customer {
  customer_id: number;
  full_name: string;
  address: string;
  id_type: string;
  id_number: string;
  registration_date: string;
}

const ManageCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Omit<Customer, 'customer_id' | 'registration_date'>>({
    full_name: '',
    address: '',
    id_type: '',
    id_number: '',
  });
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const handleAddCustomer = async () => {
    try {
      const response = await createCustomer(newCustomer);
      setCustomers(prev => [...prev, response.data]);
      setNewCustomer({ 
        full_name: '', 
        address: '', 
        id_type: '', 
        id_number: '' 
      });
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  const handleDeleteCustomer = async (id: number) => {
    try {
      await deleteCustomer({ customer_id: id });
      setCustomers(prev => prev.filter(c => c.customer_id !== id));
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer(customer);
  };

  const handleUpdateCustomer = async () => {
    if (!editingCustomer) return;
    try {
      const response = await updateCustomer({
        customer_id: editingCustomer.customer_id,
        ...editingCustomer
      });
      setCustomers(prev =>
        prev.map(c =>
          c.customer_id === editingCustomer.customer_id ? response.data : c
        )
      );
      setEditingCustomer(null);
    } catch (err) {
      console.error('Error updating customer:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingCustomer(null);
  };

  return (
    <Box className="manage-customers">
      <Typography variant="h5" gutterBottom>
        Manage Customers
      </Typography>

      {/* Add Customer Form */}
      <Paper className="customer-form" elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <TextField
                label="Full Name"
                value={newCustomer.full_name}
                onChange={(e) => setNewCustomer({ 
                  ...newCustomer, 
                  full_name: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Address"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({ 
                  ...newCustomer, 
                  address: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="ID Type (SSN/SIN/Driver License)"
                value={newCustomer.id_type}
                onChange={(e) => setNewCustomer({ 
                  ...newCustomer, 
                  id_type: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="ID Number"
                value={newCustomer.id_number}
                onChange={(e) => setNewCustomer({ 
                  ...newCustomer, 
                  id_number: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton onClick={handleAddCustomer}>
                ADD CUSTOMER
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Customer List */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Customer List
        </Typography>
        <Paper elevation={1} className="customer-list-paper">
          <ul className="customer-list">
            {customers.map((customer) => (
              <li key={customer.customer_id}>
                {editingCustomer?.customer_id === customer.customer_id ? (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      label="Full Name"
                      value={editingCustomer.full_name}
                      onChange={(e) =>
                        setEditingCustomer({ 
                          ...editingCustomer, 
                          full_name: e.target.value 
                        })
                      }
                    />
                    <TextField
                      label="Address"
                      value={editingCustomer.address}
                      onChange={(e) =>
                        setEditingCustomer({ 
                          ...editingCustomer, 
                          address: e.target.value 
                        })
                      }
                    />
                    <TextField
                      label="ID Type"
                      value={editingCustomer.id_type}
                      onChange={(e) =>
                        setEditingCustomer({ 
                          ...editingCustomer, 
                          id_type: e.target.value 
                        })
                      }
                    />
                    <TextField
                      label="ID Number"
                      value={editingCustomer.id_number}
                      onChange={(e) =>
                        setEditingCustomer({ 
                          ...editingCustomer, 
                          id_number: e.target.value 
                        })
                      }
                    />
                    <StyledButton onClick={handleUpdateCustomer}>
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
                      <strong>{customer.full_name}</strong> - {customer.address}
                      <br />
                      ID: {customer.id_type} {customer.id_number}
                      <br />
                      Registered: {new Date(customer.registration_date).toLocaleDateString()}
                    </div>
                    <div>
                      <StyledButton 
                        variant="text" 
                        onClick={() => handleEditCustomer(customer)}
                      >
                        Edit
                      </StyledButton>
                      <StyledButton 
                        variant="text" 
                        color="error" 
                        onClick={() => handleDeleteCustomer(customer.customer_id)}
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

export default ManageCustomersPage;