import React, { useEffect, useState, useCallback } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { userRegister, userAgent } from '../../data-access/api/user-register';
import { UserRegistrationData } from '../../interfaces/user';
import styles from '../../styles/users/add-user.module.css';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

const AddUser: React.FC = () => {
    const initialUserData: UserRegistrationData = {
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
        userPermission: [],
        jobTitle: '',
        username: '',
        gender: '',
        companyEmail: '',
        userRole: '', // Staff or Agent
        addedBy: '',
    };

    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);
    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    const [userData, setUserData] = useState<UserRegistrationData>(initialUserData);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: '', type: null });
    const [loading, setLoading] = useState(false);

    // Memoized function to initialize user data with logged-in user details.
    const initializeUserData = useCallback(() => {
        if (loggedInUser) {
            return {
                ...initialUserData,
                addedBy: loggedInUser.email,
                companyName: loggedInUser.companyName,
                companyEmail: loggedInUser.email,
            };
        }
        return initialUserData;
    }, [loggedInUser]);

    useEffect(() => {
        setUserData(initializeUserData());
    }, [initializeUserData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setUserData((prevData) => ({ ...prevData, [name]: value }));
    };

    const resetForm = () => setUserData(initializeUserData());

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!token) {
            setMessage({ text: 'Token is missing! Please log in again.', type: 'error' });
            setTimeout(() => navigate('/'), 1500);
            return;
        }

        setLoading(true);

        try {
            if (userData.userRole === 'staff') {
                await userRegister(userData, token, navigate);
            } else if (userData.userRole === 'agent') {
                await userAgent(userData, token, navigate);
            }

            resetForm();
            setMessage({ text: 'User added successfully!', type: 'success' });
            setTimeout(() => setMessage({ text: '', type: null }), 3000);
        } catch (error: any) {
            console.error('Registration Error:', error);
            setMessage({ text: error.message || 'An error occurred. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            {message.text && <Alert variant={message.type === 'success' ? 'success' : 'danger'}>{message.text}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formJobTitle">
                            <Form.Label>Job Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter job title" name="jobTitle" value={userData.jobTitle} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="username" value={userData.username} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" name="firstName" value={userData.firstName} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" name="lastName" value={userData.lastName} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="Enter phone number" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control as="select" name="gender" value={userData.gender} onChange={handleChange} required>
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" name="password" value={userData.password} onChange={handleChange} required />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col md={6}>
                        <Form.Group controlId="formCompanyEmail">
                            <Form.Label>Company Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter company email" 
                                name="companyEmail" 
                                value={userData.companyEmail} 
                                onChange={handleChange} 
                                required 
                                disabled // Disable the field
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formUserRole">
                            <Form.Label>User Role</Form.Label>
                            <Form.Control as="select" name="userRole" value={userData.userRole} onChange={handleChange} required>
                                <option value="">Select role</option>
                                <option value="staff">Staff</option>
                                <option value="agent">Agent</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className={styles.customButton} disabled={loading}>
                    {loading ? 'Adding...' : 'Add User'}
                </Button>
            </Form>
        </div>
    );
};

export default AddUser;
