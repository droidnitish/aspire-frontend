// src/data-access/services/logout-service.ts
import axios from 'axios';
import { ENDPOINTS } from '../api-path';

export const logoutService = async (token: string) => {
    try {
        const response = await axios.post(
            ENDPOINTS.logout,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add Authorization header
                },
                withCredentials: true, // In case of cookies
            }
        );
        console.log('Logout successful:', response.data);
    } catch (error) {
        console.error('Logout service error:', error);
        throw new Error('Logout failed');
    }
};
