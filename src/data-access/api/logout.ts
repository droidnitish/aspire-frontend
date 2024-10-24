// src/data-access/api/logout.ts
import { logoutService } from '../services/logout-service';

export const callLogoutAPI = async (token: string) => {
    try {
        await logoutService(token);
    } catch (error) {
        console.error('API logout error:', error);
    }
};
