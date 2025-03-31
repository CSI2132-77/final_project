import React, { useState, useEffect } from 'react';
import { checkInPerson, getCustomers, getRooms, getEmployees } from '../../api/index';
import './DirectRentingPage.css';

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
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [customersRes, roomsRes, employeesRes] = await Promise.all([
          getCustomers(),
          getRooms(),
          getEmployees()
        ]);
        
        // Ensure responses are arrays
        setCustomers(Array.isArray(customersRes) ? customersRes : []);
        setRooms(Array.isArray(roomsRes) ? roomsRes : []);
        setEmployees(Array.isArray(employeesRes) ? employeesRes : []);
        
      } catch (err) {
        setError('Failed to fetch initial data. Please refresh the page.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.endsWith('_id') ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    
    try {
      if (new Date(formData.end_date) <= new Date(formData.start_date)) {
        throw new Error('End date must be after start date');
      }

      const renting = await checkInPerson(formData);
      setMessage(`Renting created successfully! Renting ID: ${renting.renting_id}`);
      setFormData({
        customer_id: 0,
        room_id: 0,
        employee_id: 0,
        start_date: '',
        end_date: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Failed to create renting.');
      console.error('Error during direct renting:', err);
    }
  };

  if (isLoading) {
    return <div className="p-4">Loading data...</div>;
  }

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Direct Renting (Walk-in Customer)</h2>
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Customer:</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={customers.length === 0}
          >
            <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.full_name} (ID: {customer.customer_id})
              </option>
            ))}
          </select>
          {customers.length === 0 && <p className="text-red-500 text-sm">No customers available</p>}
        </div>

        {/* Similar structure for rooms and employees */}
        <div>
          <label className="block mb-1">Room:</label>
          <select
            name="room_id"
            value={formData.room_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={rooms.length === 0}
          >
            <option value="">Select Room</option>
            {rooms.map(room => (
              <option key={room.room_id} value={room.room_id}>
                Room {room.room_id} (Hotel: {room.hotel_id}, ${room.price})
              </option>
            ))}
          </select>
          {rooms.length === 0 && <p className="text-red-500 text-sm">No rooms available</p>}
        </div>

        <div>
          <label className="block mb-1">Employee:</label>
          <select
            name="employee_id"
            value={formData.employee_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            disabled={employees.length === 0}
          >
            <option value="">Select Employee</option>
            {employees.map(employee => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {employee.full_name} ({employee.role})
              </option>
            ))}
          </select>
          {employees.length === 0 && <p className="text-red-500 text-sm">No employees available</p>}
        </div>

        {/* Date inputs remain the same */}
        <div>
          <label className="block mb-1">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <label className="block mb-1">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min={formData.start_date || new Date().toISOString().split('T')[0]}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={customers.length === 0 || rooms.length === 0 || employees.length === 0}
        >
          Create Renting
        </button>
      </form>
    </div>
  );
};

export default DirectRentingComponent;