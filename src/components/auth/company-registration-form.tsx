import React, { useState } from 'react';
import styles from '../../styles/auth-style/company-registration-form.module.css';
import { registerCompany, CompanyRegistrationData } from '../../data-access/api/company-registration';
import { Alert } from 'react-bootstrap';

interface CompanyRegistrationFormProps {
  onSwitch: () => void; // Switch to login form
  onSuccess: () => void; // Handle successful registration
}

const CompanyRegistrationForm: React.FC<CompanyRegistrationFormProps> = ({ onSwitch, onSuccess }) => {
  const [formData, setFormData] = useState<CompanyRegistrationData>({
    email: '',
    password: '',
    companyName: '',
    addressLine1: '',
    area: '',
    city: '',
    postCode: '',
    website: '',
    phoneNumber: '',
    userType: 'staff',
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null); // To store success message

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerCompany(formData); // Call API function
      console.log('Registration response:', response); // Debugging

      // Show success message
      setSuccessMessage('Registration successful! Redirecting to login...');
      
      // Start a timer to redirect to login after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null); // Clear message
        onSuccess(); // Redirect to login form
      }, 3000); // 3-second delay
    } catch (error) {
      console.error('Registration error:', error); // Log errors for debugging
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Company Registration</h2>

      {successMessage && <Alert variant="success">{successMessage}</Alert>} {/* Success message */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          className={styles.fullWidthInput}
          value={formData.companyName}
          onChange={handleChange}
          required
        />
        <div className={styles.twoColumnContainer}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.twoColumnInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={styles.twoColumnInput}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="addressLine1"
          placeholder="Address Line 1"
          className={styles.fullWidthInput}
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />
        <div className={styles.twoColumnContainer}>
          <input
            type="text"
            name="area"
            placeholder="Area"
            className={styles.twoColumnInput}
            value={formData.area}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            className={styles.twoColumnInput}
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.twoColumnContainer}>
          <input
            type="text"
            name="postCode"
            placeholder="Post Code"
            className={styles.twoColumnInput}
            value={formData.postCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            className={styles.twoColumnInput}
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className={styles.twoColumnContainer}>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            className={styles.twoColumnInput}
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className={`${styles.twoColumnInput} ${styles.selectInput}`}
          >
            <option value="super admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="agent">Agent</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{' '}
        <button className={styles.linkButton} onClick={onSwitch}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default CompanyRegistrationForm;
