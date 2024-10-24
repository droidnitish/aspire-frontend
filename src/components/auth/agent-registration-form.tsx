import React, { useState, useEffect } from 'react';
import styles from '../../styles/auth-style/agent-registration-form.module.css';
import { handleAgentRegistration } from '../../data-access/services/agent-service';
import { UserRegistrationData } from '../../interfaces/user';
import { Alert } from 'react-bootstrap';

interface AgentRegistrationFormProps {
  onSwitch: () => void; // Switch to login form
  onSuccess: () => void; // Handle successful registration
}

const AgentRegistrationForm: React.FC<AgentRegistrationFormProps> = ({
  onSwitch,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UserRegistrationData>({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    addressLine1: '',
    area: '',
    city: '',
    postCode: '',
    website: '',
    phoneNumber: '',
    userPermission: ['agent'],
    jobTitle: '',
    username: '',
    gender: '',
    companyEmail: '',
    userRole: 'agent',
  });

  const [companies, setCompanies] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setCompanies(['Example Co', 'Another Co']);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await handleAgentRegistration(formData);
      console.log(response);
      setSuccessMessage('Agent registered successfully!');

      setTimeout(() => {
        setSuccessMessage(null);
        onSuccess();
      }, 3000);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : 'An error occurred during registration.'
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Agent Registration</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <form onSubmit={handleSubmit}>
        <div className={styles.twoColumnContainer}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className={styles.twoColumnInput}
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className={styles.twoColumnInput}
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <select
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className={`${styles.fullWidthInput} ${styles.selectInput}`}
          required
        >
          <option value="">Select Company</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
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
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          className={styles.fullWidthInput}
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already an agent?{' '}
        <button className={styles.linkButton} onClick={onSwitch}>
          Login here
        </button>
      </p>
    </div>
  );
};

export default AgentRegistrationForm;
