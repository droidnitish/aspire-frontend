import axios from 'axios';
import { ENDPOINTS } from '../api-path';

export const fetchUsers = async (token: string | null, page = 1) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await axios.get(`${ENDPOINTS.users}?page=${page}`, {
      headers,
    });
    return response.data; // Return API response data
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
