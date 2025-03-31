import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Room Search and Booking
export const searchRooms = async (params: any) => {
  return axios.get(`${API_BASE_URL}/room/available`, { params });
};

export const createBooking = async (data: any) => {
  return axios.post(`${API_BASE_URL}/booking`, data);
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
export const getAggregatedCapacity = async () => {
  return axios.get(`${API_BASE_URL}/hotel/total-rooms`);
};

export const getAvailableRoomsPerArea = async () => {
  return axios.get(`${API_BASE_URL}/hotel-chain/cid=1/hid=1/total-rooms`);
};

// Renting
export const getRentings = async () => {
  return axios.get(`${API_BASE_URL}/renting`);
};

export const createRenting = async (data: any) => {
  return axios.post(`${API_BASE_URL}/renting`, data);
};