import React from 'react';
import { Outlet } from 'react-router-dom';
import PropertyHeader from '../components/property/property-header';

const Property: React.FC = () => {
  return (
    <div>
      <PropertyHeader /> {/* Header with the menu */}
      <Outlet /> {/* This renders the nested route's content */}
    </div>
  );
};

export default Property;
