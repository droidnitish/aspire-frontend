import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/common/dashboard-header.module.css';

const DashboardHeader: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').filter(Boolean); // Split path into segments

  // Set the first meaningful segment after 'dashboard' as the main label
  const mainComponentName = 
    currentPath.includes('property') ? 'Property' : currentPath[1] || 'Home';

  // Construct the full breadcrumb path excluding the last segment
  const parentPath = ['dashboard', ...currentPath.slice(1, -1)].join(' > ');

  // Get the last segment (e.g., 'add' or 'edit') for display at the end
  const lastSegment = currentPath[currentPath.length - 1];

  return (
    <div className={styles.header}>
      <span className={styles.label}>
        {mainComponentName.charAt(0).toUpperCase() + mainComponentName.slice(1)}
      </span>
      <span className={styles.separator}> {parentPath} {' > '} </span>
      <span className={styles.path}>{lastSegment}</span>
    </div>
  );
};

export default DashboardHeader;
