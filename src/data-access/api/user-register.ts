// src/data-access/api/user-register.ts
import axios from 'axios';
import { ENDPOINTS } from '../api-path';
import { NavigateFunction } from 'react-router-dom'; // Import the type for navigation

const handleApiError = (error: any, navigate: NavigateFunction) => {
  if (error.response && error.response.status === 401) {
    // If token is invalid, redirect to login
    setTimeout(() => navigate('/'), 1500);
    return 'Token expired. Please log in again.';
  }
  return error.response ? error.response.data : error.message;
};

export const userRegister = async (userData: any, token: string, navigate: NavigateFunction) => {
  try {
    const response = await axios.post(ENDPOINTS.userRegister, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error: any) {
    throw handleApiError(error, navigate);
  }
};

export const userAgent = async (userData: any, token: string, navigate: NavigateFunction) => {
  try {
    const response = await axios.post(ENDPOINTS.userAgent, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; 
  } catch (error: any) {
    throw handleApiError(error, navigate);
  }
};
