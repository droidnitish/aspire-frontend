// src/store/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from './types'; // Import types

// Initial State
const initialState: AuthState = {
  token: null,
  user: null, // Initialize user as null
};

// Create Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set Token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    // Set User Data
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Clear Token and User on Logout
    logout: (state) => {
      state.token = null;
      state.user = null;
    },

    // Clear Token Only
    clearToken: (state) => {
      state.token = null;
    },

    // Clear User Only
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// Export Actions and Reducer
export const { setToken, clearToken, setUser, clearUser, logout } = authSlice.actions;
export default authSlice.reducer;
