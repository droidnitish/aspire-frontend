// src/components/common/dashboard-layout.tsx
import React, { useState } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import styles from '../../styles/common/dashboard-layout.module.css';
import DashboardHeader from './dashboard-header';
import { Button, Card } from 'react-bootstrap';

const DashboardLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className={styles.contentBar}>
        <div className={styles.contentBarHeader}>
          <Header onToggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
        </div>
        <div className={styles.contentBarContainer}>
          <Card className={`text-left ${styles.contentBarCard}`}>
            <Card.Header>
              <DashboardHeader /> {/* Include the new dashboard header */}
            </Card.Header>
            <Card.Body className={`${styles.contentBarCardBody}`}>
              <Outlet /> {/* This is where nested routes will render */}
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
