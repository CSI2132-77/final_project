import React, { useEffect, useState } from 'react';
import { Typography, TextField, Box, Grid, Paper } from '@mui/material';
import { 
  getEmployees, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from '../../api';
import StyledButton from '../../components/StyledButton';
import './ManageEmployeesPage.css';

interface Employee {
  employee_id: number;
  full_name: string;
  address: string;
  ssn_sin: string;
  role: string;
  hotel_id: number;
}

const ManageEmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'employee_id'>>({
    full_name: '',
    address: '',
    ssn_sin: '',
    role: '',
    hotel_id: 0
  });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const handleAddEmployee = async () => {
    try {
      const response = await createEmployee({
        ...newEmployee,
        hotel_id: Number(newEmployee.hotel_id)
      });
      setEmployees(prev => [...prev, response.data]);
      setNewEmployee({ 
        full_name: '', 
        address: '', 
        ssn_sin: '', 
        role: '', 
        hotel_id: 0 
      });
    } catch (err) {
      console.error('Error adding employee:', err);
    }
  };

  const handleDeleteEmployee = async (id: number) => {
    try {
      await deleteEmployee({ employee_id: id });
      setEmployees(prev => prev.filter(e => e.employee_id !== id));
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = async () => {
    if (!editingEmployee) return;
    try {
      const response = await updateEmployee({
        employee_id: editingEmployee.employee_id,
        ...editingEmployee
      });
      setEmployees(prev =>
        prev.map(e =>
          e.employee_id === editingEmployee.employee_id ? response.data : e
        )
      );
      setEditingEmployee(null);
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  return (
    <Box className="manage-employees">
      <Typography variant="h5" gutterBottom>
        Manage Employees
      </Typography>

      {/* Add Employee Form */}
      <Paper className="employee-form" elevation={3}>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Full Name"
                value={newEmployee.full_name}
                onChange={(e) => setNewEmployee({ 
                  ...newEmployee, 
                  full_name: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Address"
                value={newEmployee.address}
                onChange={(e) => setNewEmployee({ 
                  ...newEmployee, 
                  address: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="SSN/SIN"
                value={newEmployee.ssn_sin}
                onChange={(e) => setNewEmployee({ 
                  ...newEmployee, 
                  ssn_sin: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Role (manager/receptionist/housekeeping)"
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ 
                  ...newEmployee, 
                  role: e.target.value 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <TextField
                label="Hotel ID"
                type="number"
                value={newEmployee.hotel_id || ''}
                onChange={(e) => setNewEmployee({ 
                  ...newEmployee, 
                  hotel_id: parseInt(e.target.value) || 0 
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton onClick={handleAddEmployee}>
                ADD EMPLOYEE
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Employee List */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Employee List
        </Typography>
        <Paper elevation={1} className="employee-list-paper">
          <ul className="employee-list">
            {employees.map(employee => (
              <li key={employee.employee_id}>
                {editingEmployee?.employee_id === employee.employee_id ? (
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      label="Full Name"
                      value={editingEmployee.full_name}
                      onChange={(e) => setEditingEmployee({ 
                        ...editingEmployee, 
                        full_name: e.target.value 
                      })}
                    />
                    <TextField
                      label="Address"
                      value={editingEmployee.address}
                      onChange={(e) => setEditingEmployee({ 
                        ...editingEmployee, 
                        address: e.target.value 
                      })}
                    />
                    <TextField
                      label="SSN/SIN"
                      value={editingEmployee.ssn_sin}
                      onChange={(e) => setEditingEmployee({ 
                        ...editingEmployee, 
                        ssn_sin: e.target.value 
                      })}
                    />
                    <TextField
                      label="Role"
                      value={editingEmployee.role}
                      onChange={(e) => setEditingEmployee({ 
                        ...editingEmployee, 
                        role: e.target.value 
                      })}
                    />
                    <TextField
                      label="Hotel ID"
                      type="number"
                      value={editingEmployee.hotel_id}
                      onChange={(e) => setEditingEmployee({ 
                        ...editingEmployee, 
                        hotel_id: parseInt(e.target.value) || 0 
                      })}
                    />
                    <StyledButton onClick={handleUpdateEmployee}>
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
                      <strong>{employee.full_name}</strong> - {employee.role}
                      <br />
                      SSN/SIN: {employee.ssn_sin}
                      <br />
                      Hotel ID: {employee.hotel_id}
                      <br />
                      Address: {employee.address}
                    </div>
                    <div>
                      <StyledButton 
                        variant="text" 
                        onClick={() => handleEditEmployee(employee)}
                      >
                        Edit
                      </StyledButton>
                      <StyledButton 
                        variant="text" 
                        color="error" 
                        onClick={() => handleDeleteEmployee(employee.employee_id)}
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

export default ManageEmployeesPage;