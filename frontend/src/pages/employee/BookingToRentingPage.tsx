import React, { useState, useEffect } from 'react';
import { checkInOnline, getBookings, getEmployees } from '../../api/index';
import './BookingToRentingPage.css';

interface Booking {
  booking_id: number;
  customer_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  status: string;
}

interface Employee {
  employee_id: number;
  full_name: string;
  role: string;
}

const BookingToRentingComponent: React.FC = () => {
  const [bookingId, setBookingId] = useState<number>(0);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [bookings, setBookings] = useState<Record<number, Booking>>({});
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [bookingsRes, employeesRes] = await Promise.all([
          getBookings(),
          getEmployees()
        ]);
        
        // Ensure bookings is an object and employees is an array
        if (bookingsRes && typeof bookingsRes === 'object' && !Array.isArray(bookingsRes)) {
          setBookings(bookingsRes);
        } else {
          throw new Error('Invalid bookings data format');
        }

        if (Array.isArray(employeesRes)) {
          setEmployees(employeesRes);
        } else {
          throw new Error('Invalid employees data format');
        }

      } catch (err: any) {
        console.error('API Error:', err);
        setError(err.response?.data?.message || 
                err.response?.data?.detail || 
                err.message || 
                'Failed to fetch data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      if (!bookingId || !employeeId) {
        throw new Error('Please select both a booking and an employee');
      }

      // Convert dictionary to array and filter active bookings
      const activeBookings = Object.values(bookings).filter(
        booking => booking.status === 'active'
      );

      if (!activeBookings.some(b => b.booking_id === bookingId)) {
        throw new Error('Selected booking is not active or does not exist');
      }

      const response = await checkInOnline({
        booking_id: bookingId,
        employee_id: employeeId
      });

      setMessage(`Successfully converted booking to renting! Renting ID: ${response.renting_id}`);
      
      // Reset form
      setBookingId(0);
      setEmployeeId(0);

      // Refresh bookings list
      const updatedBookings = await getBookings();
      if (updatedBookings && typeof updatedBookings === 'object') {
        setBookings(updatedBookings);
      }

    } catch (err: any) {
      console.error('Conversion Error:', err);
      setError(err.response?.data?.message || 
              err.response?.data?.detail || 
              err.message || 
              'Failed to convert booking to renting');
    } finally {
      setIsLoading(false);
    }
  };

  // Convert bookings dictionary to array for rendering
  const bookingList = Object.values(bookings).filter(
    booking => booking.status === 'active'
  );

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Convert Booking to Renting</h2>
      
      {/* Status Messages */}
      {isLoading && <div className="bg-blue-100 text-blue-800 p-2 mb-4 rounded">Processing...</div>}
      {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
      {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Active Booking:</label>
          <select
            value={bookingId}
            onChange={(e) => setBookingId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading || bookingList.length === 0}
          >
            <option value="">Select Booking</option>
            {bookingList.length > 0 ? (
              bookingList.map((booking) => (
                <option key={booking.booking_id} value={booking.booking_id}>
                  Booking #{booking.booking_id} - Room {booking.room_id} - 
                  {new Date(booking.check_in_date).toLocaleDateString()} to 
                  {new Date(booking.check_out_date).toLocaleDateString()}
                </option>
              ))
            ) : (
              <option value="" disabled>No active bookings available</option>
            )}
          </select>
        </div>

        <div>
          <label className="block mb-1">Employee:</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(Number(e.target.value))}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading || employees.length === 0}
          >
            <option value="">Select Employee</option>
            {employees.length > 0 ? (
              employees.map(employee => (
                <option key={employee.employee_id} value={employee.employee_id}>
                  {employee.full_name} ({employee.role})
                </option>
              ))
            ) : (
              <option value="" disabled>No employees available</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading || bookingList.length === 0 || employees.length === 0}
        >
          {isLoading ? 'Processing...' : 'Convert to Renting'}
        </button>
      </form>
    </div>
  );
};

export default BookingToRentingComponent;