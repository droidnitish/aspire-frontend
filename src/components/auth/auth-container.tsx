import React, { useState } from 'react';
import LoginForm from './login-form';
import CompanyRegistrationForm from './company-registration-form';
import AgentRegistrationForm from './agent-registration-form';
import styles from '../../styles/auth-style/auth-container.module.css';

type FormType = 'login' | 'company' | 'agent';

const AuthContainer: React.FC = () => {
  const [formType, setFormType] = useState<FormType>('login');

  const handleSwitch = (formType: FormType) => {
    setFormType(formType);
  };

  const handleSuccess = () => {
    // Handle success logic here, like redirecting or showing a message
    alert('Registration successful!');
    handleSwitch('login'); // Switch to login after successful registration
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.leftSection}>
          <h1>Welcome to Aspire</h1>
        </div>
        <div className={styles.rightSection}>
          {formType === 'login' && <LoginForm onSwitch={handleSwitch} />}
          {formType === 'company' && (
            <CompanyRegistrationForm onSwitch={() => handleSwitch('login')} onSuccess={handleSuccess} />
          )}
          {formType === 'agent' && (
            <AgentRegistrationForm onSwitch={() => handleSwitch('login')} onSuccess={handleSuccess} />
          )}
        </div>
      </div>

    </div>
  );
};

export default AuthContainer;
