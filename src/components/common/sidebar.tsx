// src/components/common/sidebar.tsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from '../../styles/common/sidebar.module.css';
import menuData from '../../data-access/data/sidebar-menu.json';
import * as Icons from 'react-icons/fa';

interface MenuItem {
  label: string;
  path: string;
  icon: string;
}

interface SidebarProps {
  isCollapsed: boolean; // Add prop to manage collapse state
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation(); // Get current location

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName];
    return IconComponent ? <IconComponent className={styles.icon} /> : null;
  };

  // Function to determine if the link should be active
  const isActiveLink = (path: string) => {
    return location.pathname === path; // Only active if exactly matches the path
  };

  return (
    <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoContainer}>
        <h1 className={styles.appName}>
          <span>{isCollapsed ? 'A' : 'Aspire'}</span>
        </h1>
      </div>
      <ul>
        {menuData.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActiveLink(item.path) ? styles.active : '')} // Use custom active check
            >
              {renderIcon(item.icon)}
              <span>{isCollapsed ? '' : item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
