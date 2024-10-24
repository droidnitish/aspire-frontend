// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import styles from '../../styles/auth-style/login-form.module.css'; // Ensure CSS is imported
import { useDispatch } from 'react-redux'; // Use Redux dispatch
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { loginUser } from '../../data-access/services/auth-service'; // API service for login
import { setToken, setUser } from '../../store/auth/auth-slice';
import store from '../../store/store';
import { Alert } from 'react-bootstrap'; // Import Bootstrap Alert

interface LoginFormProps {
  onSwitch: (formType: 'company' | 'agent') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const navigate = useNavigate(); // Initialize the useNavigate hook for redirection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [success, setSuccess] = useState<string | null>(null); // State for success messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    try {
      const response = await loginUser({ email, password }); // Call API service
      const { token, user } = response.data; // Extract token and user details from response

      console.log('Token received:', token); // Log the token
      console.log('User details:', user); // Log the user details

      dispatch(setToken(token)); // Save token in Redux store
      dispatch(setUser(user)); // Save user details in Redux store

      console.log('Stored token:', store.getState().auth.token); // Verify stored token
      console.log('Stored user:', store.getState().auth.user); // Verify stored user

      setSuccess('Login successful! Redirecting to dashboard...'); // Set success message
      setTimeout(() => navigate('/dashboard'), 1500); // Redirect after a delay
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Invalid email or password'); // Set error message
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>

      {/* Bootstrap Alert for Error Message */}
      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {/* Bootstrap Alert for Success Message */}
      {success && (
        <Alert variant="success" className="mt-3">
          {success}
        </Alert>
      )}

      <p>
        Don{`'`}t have an account?{' '}
        <button className={styles.linkButton} onClick={() => onSwitch('company')}>
          Register here
        </button>
      </p>
      <p>
        <button className={styles.linkButton} onClick={() => onSwitch('agent')}>
          Agent Registration
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
