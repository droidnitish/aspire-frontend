// src/store/actions/logout.ts
import { logout } from '../auth/auth-slice';
import { AppDispatch } from '../store'; // Import store type
import { callLogoutAPI } from '../../data-access/api/logout';

// Logout Redux Action
export const handleLogout = (token: string) => async (dispatch: AppDispatch) => {
  try {
    await callLogoutAPI(token); // Call logout API with token
    dispatch(logout()); // Clear token and user from store
  } catch (error) {
    console.error('Logout action error:', error);
  }
};
