// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/index'; // Ensure this path is correct

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth reducer to the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; // Export the configured store
