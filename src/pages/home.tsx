import React from 'react';
import { useLocation } from 'react-router-dom';
import AuthContainer from '../components/auth/auth-container';
import styles from '../styles/home.module.css';

const Home: React.FC = () => {
    const location = useLocation();

    // Check the path to decide which component to render
    const renderComponent = () => {
        if (location.pathname === '/signup') {
            return <AuthContainer />;
        }
        // Default to Login if the path is '/' or anything else
        return <AuthContainer />;
    };

    return (
        <div className={styles.homeContainer}>
            {/* <h1>Home Page</h1> */}
            {renderComponent()}
        </div>
    );
};

export default Home;
