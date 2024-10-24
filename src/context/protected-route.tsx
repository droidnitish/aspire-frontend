// src/components/auth/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface ProtectedRouteProps {
  children: React.ReactNode; // Define children prop
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }

  // Render the children if the token exists
  return <>{children}</>;
};

export default ProtectedRoute;
