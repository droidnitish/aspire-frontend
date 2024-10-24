// src/data-access/services/auth-service.ts
import axios from 'axios';
import { ENDPOINTS } from '../api-path';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async (data: LoginPayload) => {
  return axios.post(ENDPOINTS.login, data); // API call to login endpoint
};
