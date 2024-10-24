// src/data-access/api/property-registration.ts
import axios from 'axios';
import { ENDPOINTS } from '../api-path';
import { PropertyData } from '../../interfaces/property';

export const addProperty = async (propertyData: PropertyData, token: string | null): Promise<any> => {
    try {
        const response = await axios.post(ENDPOINTS.addProperty, propertyData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: unknown) {
        // Type assertion to access the error properties
        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Failed to add property');
        } else {
            throw new Error('An unknown error occurred while adding the property');
        }
    }
};
