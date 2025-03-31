import React, { useState, useEffect } from 'react';
import { checkInPerson, getCustomers, getRooms, getEmployees, getRentings } from '../../api/index';
import './DirectRentingPage.css';
import { AxiosResponse } from 'axios';

interface DirectRentingFormData {
  customer_id: number;
  room_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
}

interface Customer {
  customer_id: number;
  full_name: string;
}

interface Room {
  room_id: number;
  hotel_id: number;
  price: number;
}

interface Employee {
  employee_id: number;
  full_name: string;
  role: string;
}

interface Renting {
  renting_id: number;
  room_id: number;
  start_date: string;
  end_date: string;
}

const DirectRentingComponent: React.FC = () => {
  const [formData, setFormData] = useState<DirectRentingFormData>({
    customer_id: 0,
    room_id: 0,
    employee_id: 0,
    start_date: '',
    end_date: ''
  });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rentings, setRentings] = useState<Renting[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        const [
          customersResponse,
          roomsResponse,
          employeesResponse,
          rentingsResponse
        ] = await Promise.all([
          getCustomers(),
          getRooms(),
          getEmployees(),
          getRentings()
        ]);

        setCustomers(customersResponse?.data || []);
        setRooms(roomsResponse?.data || []);
        setEmployees(employeesResponse?.data || []);
        setRentings(rentingsResponse?.data || []);

      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getAvailableRooms = (): Room[] => {
    if (!formData.start_date || !formData.end_date) {
      return rooms || [];
    }

    const startDate = new Date(formData.start_date);
    const endDate = new Date(formData.end_date);

    // Ensure rentings is an array before calling .some()
    const currentRentings = rentings || [];

    return (rooms || []).filter(room => {
      const isBooked = currentRentings.some(renting => 
        renting.room_id === room.room_id &&
        new Date(renting.end_date) >= startDate &&
        new Date(renting.start_date) <= endDate
      );
      return !isBooked;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.endsWith('_id') ? Number(value) : value
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      room_id: 0 // Reset room selection when dates change
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      // Validate dates
      const startDate = new Date(formData.start_date);
      const endDate = new Date(formData.end_date);
      
      if (endDate <= startDate) {
        throw new Error('End date must be after start date');
      }

      // Check if selected room is still available
      const availableRooms = getAvailableRooms();
      if (!availableRooms.some(room => room.room_id === formData.room_id)) {
        throw new Error('Selected room is no longer available. Please choose another room.');
      }

      // Submit the form
      const response = await checkInPerson(formData);
      setMessage(`Renting created successfully! ID: ${response.renting_id}`);

      // Reset form
      setFormData({
        customer_id: 0,
        room_id: 0,
        employee_id: 0,
        start_date: '',
        end_date: ''
      });

      // Refresh rentings data
      const rentingsRes = await getRentings();
      setRentings(rentingsRes?.data || []);

    } catch (err) {
      setError(err.response?.data?.detail || 
              err.response?.data?.message || 
              err.message || 
              'Failed to create renting. Please try again.');
      console.error('Submission error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading data...</div>;
  }

  const availableRooms = getAvailableRooms();
  const areDatesSelected = formData.start_date && formData.end_date;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Direct Renting (Walk-in Customer)</h2>
      
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Selection */}
        <div>
          <label className="block mb-1">Customer:</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Customer</option>
            {(customers || []).map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.full_name} (ID: {customer.customer_id})
              </option>
            ))}
          </select>
          {customers.length === 0 && (
            <p className="text-red-500 text-sm mt-1">No customers available</p>
          )}
        </div>

        {/* Room Selection */}
        <div>
          <label className="block mb-1">Room:</label>
          <select
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={!areDatesSelected || availableRooms.length === 0}
          >
            <option value="">Select Room</option>
            {availableRooms.map(room => (
              <option key={room.room_id} value={room.room_id}>
                Room {room.room_id} (Hotel: {room.hotel_id}, ${room.price})
              </option>
            ))}
          </select>
          {!areDatesSelected ? (
            <p className="text-gray-500 text-sm mt-1">Please select dates first</p>
          ) : availableRooms.length === 0 ? (
            <p className="text-red-500 text-sm mt-1">No available rooms for selected dates</p>
          ) : null}
        </div>

        {/* Employee Selection */}
        <div>
          <label className="block mb-1">Employee:</label>
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Employee</option>
            {(employees || []).map(employee => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.full_name} ({employee.role})
              </option>
            ))}
          </select>
          {employees.length === 0 && (
            <p className="text-red-500 text-sm mt-1">No employees available</p>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleDateChange}
            className="w-full p-2 border rounded"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block mb-1">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleDateChange}
            className="w-full p-2 border rounded"
            required
            min={formData.start_date || new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading || 
                   !formData.customer_id || 
                   !formData.room_id || 
                   !formData.employee_id || 
                   !formData.start_date || 
                   !formData.end_date}
        >
          {isLoading ? 'Processing...' : 'Create Renting'}
        </button>
      </form>
    </div>
  );
};

export default DirectRentingComponent;