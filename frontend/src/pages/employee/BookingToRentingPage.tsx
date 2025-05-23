import React, { useState, useEffect } from 'react';
import { checkInOnline, getBookings, getEmployees, getRentings } from '../../api/index';
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

interface Renting {
  renting_id: number;
  booking_id: number | null;
  customer_id: number;
  room_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
}

const BookingToRentingComponent: React.FC = () => {
  const [bookingId, setBookingId] = useState<number>(0);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [rentings, setRentings] = useState<Renting[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError('');
      try {
        const [bookingsRes, employeesRes, rentingsRes] = await Promise.all([
          getBookings(),
          getEmployees(),
          getRentings()
        ]);
        
        setBookings(bookingsRes);
        setEmployees(employeesRes.data);
        setRentings(rentingsRes);
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

      const response = await checkInOnline({
        booking_id: bookingId,
        employee_id: employeeId
      });

      setMessage(`Successfully converted booking to renting! Renting ID: ${response.renting_id}`);
      
      // Reset form
      setBookingId(0);
      setEmployeeId(0);

      // Refresh data
      const [updatedBookings, updatedRentings] = await Promise.all([
        getBookings(),
        getRentings()
      ]);
      setBookings(updatedBookings);
      setRentings(updatedRentings);

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

  // Get bookings that can be converted to rentings
  const getAvailableBookings = () => {
    const bookedRentingIds = rentings
      .filter(renting => renting.booking_id !== null)
      .map(renting => renting.booking_id) as number[];

    return bookings.filter(booking => {
      const isActive = booking.status === 'active';
      const hasNoRenting = !bookedRentingIds.includes(booking.booking_id);
      return isActive && hasNoRenting;
    });
  };

  const availableBookings = getAvailableBookings();

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
            className={`w-full p-2 border rounded ${
              availableBookings.length === 0 ? 'bg-gray-100' : ''
            }`}
            required
            disabled={isLoading}
          >
            <option value="">Select Booking</option>
            {availableBookings.length > 0 ? (
              availableBookings.map((booking) => (
                <option key={booking.booking_id} value={booking.booking_id}>
                  Booking #{booking.booking_id} - Room {booking.room_id} - 
                  {new Date(booking.check_in_date).toLocaleDateString()} to 
                  {new Date(booking.check_out_date).toLocaleDateString()}
                </option>
              ))
            ) : (
              <option value="" disabled>
                {bookings.length === 0 ? 'No bookings available' : 'No active bookings available for conversion'}
              </option>
            )}
          </select>
          {availableBookings.length === 0 && bookings.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              All active bookings have already been converted to rentings
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1">Employee:</label>
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(Number(e.target.value))}
            className={`w-full p-2 border rounded ${
              employees.length === 0 ? 'bg-gray-100' : ''
            }`}
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
          disabled={isLoading || availableBookings.length === 0 || employees.length === 0}
        >
          {isLoading ? 'Processing...' : 'Convert to Renting'}
        </button>
      </form>
    </div>
  );
};

export default BookingToRentingComponent;