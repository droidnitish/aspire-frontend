// src/data-access/api/companyRegistration.ts
import axios, { AxiosError } from 'axios';
import { ENDPOINTS } from '../api-path';

// Interface for company registration data
export interface CompanyRegistrationData {
  email: string;
  password: string;
  companyName: string;
  addressLine1: string;
  area: string;
  city: string;
  postCode: string;
  website: string;
  phoneNumber: string;
  userType: string; // 'super admin', 'admin', 'staff', 'agent'
}

// Function to register a company
export const registerCompany = async (companyData: CompanyRegistrationData) => {
  try {
    const response = await axios.post(ENDPOINTS.companyRegistration, companyData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      const errorMessage = (axiosError.response.data as { message: string }).message || 'Error registering company';
      throw new Error(errorMessage);
    } else {
      throw new Error('Network error or no response received');
    }
  }
};
