import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Room Search and Booking

export interface Booking {
  booking_id: number;
  customer_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  status: 'active' | 'canceled' | 'completed';
}

export interface Renting {
  renting_id: number;
  booking_id: number | null;
  customer_id: number;
  room_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
}

export const searchRooms = async (params: any) => {
  return axios.get(`${API_BASE_URL}/room/available`, { params });
};

// Renting
export const deleteRenting = async (renting_id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/renting/delete`, { 
    data: { renting_id } 
  });
};

export const getRentings = async (): Promise<Renting[]> => {
  const response = await axios.get(`${API_BASE_URL}/renting`);
  return response.data;
};

export const createRenting = async (data: any) => {
  return axios.post(`${API_BASE_URL}/renting`, data);
};

// Booking
export const createBooking = async (data: {
  customer_id: number;
  room_id: number;
  check_in_date: string;
  check_out_date: string;
  status?: 'active' | 'canceled' | 'completed';
}): Promise<Booking> => {
  const response = await axios.post(`${API_BASE_URL}/book`, data);
  return response.data;
};

export const checkInOnline = async (data: {
  booking_id: number;
  employee_id: number;
}): Promise<Renting> => {
  const response = await axios.post(`${API_BASE_URL}/check_in/online`, data);
  return response.data;
};

export const checkInPerson = async (data: {
  customer_id: number;
  room_id: number;
  employee_id: number;
  start_date: string;
  end_date: string;
}): Promise<Renting> => {
  const response = await axios.post(`${API_BASE_URL}/check_in/in_person`, data);
  return response.data;
};

export const deleteBooking = async (booking_id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/booking/delete`, { 
    data: { booking_id } 
  });
};



// Customers
export const getCustomers = async () => {
  return axios.get(`${API_BASE_URL}/customer`);
};

export const createCustomer = async (data: any) => {
  return axios.post(`${API_BASE_URL}/customer/add`, data);
};

export const updateCustomer = async (data: any) => {
  return axios.patch(`${API_BASE_URL}/customer/update`, data);
};

export const deleteCustomer = async (data: { customer_id: number }) => {
  return axios.delete(`${API_BASE_URL}/customer/delete`, { data });
};

// Employees
export const getEmployees = async () => {
  return axios.get(`${API_BASE_URL}/employee`);
};

export const createEmployee = async (data: any) => {
  return axios.post(`${API_BASE_URL}/employee/add`, data);
};

export const updateEmployee = async (data: any) => {
  return axios.patch(`${API_BASE_URL}/employee/update`, data);
};

export const deleteEmployee = async (data: { employee_id: number }) => {
  return axios.delete(`${API_BASE_URL}/employee/delete`, { data });
};

// Hotels
export const getHotels = async () => {
  return axios.get(`${API_BASE_URL}/hotel`);
};

export const createHotel = async (data: any) => {
  return axios.post(`${API_BASE_URL}/hotel/add`, data);
};

export const updateHotel = async (data: any) => {
  return axios.patch(`${API_BASE_URL}/hotel/update`, data);
};

export const deleteHotel = async (data: { hotel_id: number }) => {
  return axios.delete(`${API_BASE_URL}/hotel/delete`, { data });
};

// Rooms
export const getRooms = async () => {
  return axios.get(`${API_BASE_URL}/room`);
};

export const createRoom = async (data: any) => {
  return axios.post(`${API_BASE_URL}/room/add`, data);
};

export const updateRoom = async (data: any) => {
  return axios.patch(`${API_BASE_URL}/room/update`, data);
};

export const deleteRoom = async (data: { room_id: number }) => {
  return axios.delete(`${API_BASE_URL}/room/delete`, { data });
};

// Views

export interface HotelRoomCapacity {
  hotel_id: number;
  address: string;
  category: number;
  total_rooms: number;
  single_rooms: number;
  double_rooms: number;
  suite_rooms: number;
}

export interface AvailableRoomsPerArea {
  area: string;
  available_rooms: number;
  min_price: number;
  max_price: number;
  avg_price: number;
}

export const fetchHotelRoomCapacity = async (): Promise<HotelRoomCapacity[]> => {
try {
  const response = await axios.get<HotelRoomCapacity[]>(`${API_BASE_URL}/hotel-room-capacity`);
  return response.data;
} catch (error) {
  console.error('Error fetching capacity:', error);
  throw error;
}
};

export const fetchAvailableRoomsPerArea = async (): Promise<AvailableRoomsPerArea[]> => {
  try {
  const response = await axios.get<AvailableRoomsPerArea[]>(`${API_BASE_URL}/available-rooms-per-area`);
  return response.data;
} catch (error) {
  console.error('Error fetching available rooms:', error);
  throw error;
}
};


