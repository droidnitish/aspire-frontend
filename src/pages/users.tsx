import React from 'react';
import { Outlet } from 'react-router-dom';
import UsersHeader from '../components/users/users-header';

const Users: React.FC = () => {
  return (
    <div>
      <UsersHeader /> {/* Header with the menu */}
      <Outlet /> {/* This renders the nested route's content */}
    </div>
  );
};

export default Users;
