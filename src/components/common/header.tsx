// src/components/common/header.tsx
import React from 'react';
import { FaBars } from 'react-icons/fa'; // Import an icon for the toggle
import styles from '../../styles/common/header.module.css';
import LogoutButton from '../auth/logout-button';

interface HeaderProps {
  onToggleSidebar: () => void; // Function to toggle sidebar
  isSidebarCollapsed: boolean; // Current state of the sidebar
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  return (
    <header className={styles.header}>
      <div className={styles.toggleButton} onClick={onToggleSidebar}>
        <FaBars />
      </div>
      <div className={styles.appName}>
        {/* <h1>My App</h1> */}
      </div>
      <div className={styles.userOptions}>
        {/* Add user options like Profile, Settings, Logout here */}
        {<LogoutButton />}
      </div>
    </header>
  );
};

export default Header;
