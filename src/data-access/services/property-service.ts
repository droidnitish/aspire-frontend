// src/data-access/services/property-service.ts
import { addProperty } from '../api/property-registration';
import { PropertyData } from '../../interfaces/property';

export const registerProperty = async (propertyData: PropertyData, token: string | null) => {
    try {
        const response = await addProperty(propertyData, token);
        return response; // You can add any additional processing here if needed
    } catch (error: unknown) {
        // Type assertion to handle the error
        if (error instanceof Error) {
            throw new Error(error.message); // Re-throw with the original message
        } else {
            throw new Error('An unknown error occurred while registering the property');
        }
    }
};
