import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaUser } from 'react-icons/fa'; // Importing icons
import styles from '../../styles/property/property-header.module.css';

const UsersHeader: React.FC = () => {
  return (
    <div className={styles.propertyHeader}>
      <div className={styles.menu}>
        <NavLink 
          to="add" 
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <FaPlus className={styles.icon} /> {/* Add icon */}
          Add User
        </NavLink>

        <NavLink 
          to="view-users" 
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <FaUser className={styles.icon} /> {/* Edit icon */}
          Users List
        </NavLink>
        <NavLink 
          to="view-agents" 
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <FaUser className={styles.icon} /> {/* Edit icon */}
          Agents List
        </NavLink>
      </div>
    </div>
  );
};

export default UsersHeader;
