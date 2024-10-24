// src/components/auth/LogoutButton.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../store/actions/logout';
import { RootState, AppDispatch } from '../../store/store'; // Import store types
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const dispatch: AppDispatch = useDispatch(); // Properly type dispatch
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const onLogout = async () => {
    if (!token) {
      console.warn('Token is missing, cannot logout.');
      return; // Return early if token is null
    }

    try {
      await dispatch(handleLogout(token)); // Dispatch logout action
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout failed:', error); // Handle logout errors
    }
  };

  return(
    <>
     <Button variant="primary" onClick={onLogout}>
            <span className="me-2">
                <i className="bi bi-box-arrow-right me-2"></i>
            </span>
            Logout
        </Button>
    </>
  );
};

export default LogoutButton;
