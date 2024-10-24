import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaEdit } from 'react-icons/fa'; // Importing icons
import styles from '../../styles/property/property-header.module.css';

const PropertyHeader: React.FC = () => {
  return (
    <div className={styles.propertyHeader}>
      <div className={styles.menu}>
        <NavLink 
          to="add" 
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <FaPlus className={styles.icon} /> {/* Add icon */}
          Add Property
        </NavLink>

        <NavLink 
          to="edit" 
          className={({ isActive }) => (isActive ? styles.active : '')}
        >
          <FaEdit className={styles.icon} /> {/* Edit icon */}
          Edit Property
        </NavLink>
      </div>
    </div>
  );
};

export default PropertyHeader;
