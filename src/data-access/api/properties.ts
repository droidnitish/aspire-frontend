// src/data-access/api/properties.ts
import axios from 'axios';
import { ENDPOINTS } from '../api-path';

export const fetchProperties = async (token: string | null) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    try {
        const response = await axios.get(ENDPOINTS.properties, { headers });
        return response.data; // Return the data received from the API
    } catch (error) {
        console.error('Error fetching properties:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};
