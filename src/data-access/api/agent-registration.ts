// src/data-access/api/agent-registration.ts
import axios from 'axios';
import { ENDPOINTS } from '../api-path';
import { UserRegistrationData } from '../../interfaces/user';

export const registerAgent = async (agentData: UserRegistrationData) => {
  const response = await axios.post(ENDPOINTS.agentRegistration, agentData);
  return response.data;
};
