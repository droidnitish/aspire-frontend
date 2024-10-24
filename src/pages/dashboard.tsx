import React, { useEffect, useState } from 'react';
import PropertyHeader from '../components/property/property-header';
import Properties from '../components/widgets/property/properties';
import { PropertyData } from '../interfaces/property';
import CardStats from '../components/widgets/card-stats';
import { FaHome, FaBed, FaUser, FaTimesCircle } from 'react-icons/fa';
import { fetchProperties } from '../data-access/api/properties';
import { useSelector } from 'react-redux';

const Dashboard: React.FC = () => {
    const [properties, setProperties] = useState<PropertyData[]>([]);
    
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        const getProperties = async () => {
            try {
                const data = await fetchProperties(token);
                console.log('Fetched Properties:', data); // Debugging log
                setProperties(data.properties); // Access the properties array correctly
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        getProperties();
    }, [token]);


    const stats = [
        { title: 'Total Properties', value: properties.length, icon: <FaHome size={24} /> }, // Directly use properties.length
        { title: 'Total Rooms', value: 20, icon: <FaBed size={24} /> },
        { title: 'Active Tenants', value: 10, icon: <FaUser size={24} /> },
        { title: 'Void Rooms', value: 10, icon: <FaTimesCircle size={24} /> },
    ];

    return (
        <>
            <PropertyHeader />
        <h3>Property Details</h3>
            <CardStats stats={stats} />
            <><br/></>
            <Properties properties={properties} />
        </>
    );
};

export default Dashboard;
