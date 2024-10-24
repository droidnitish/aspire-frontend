// src/context/auth-context.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../data-access/api-path';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void; // Add logout function if needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
      if (response.status === 200) {
        // Set authenticated state
        setIsAuthenticated(true);
        // Optionally save the token in localStorage or context
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message)
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Optionally clear token from localStorage or context
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
