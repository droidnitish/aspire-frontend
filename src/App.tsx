// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import DashboardLayout from './components/common/dashboard-layout';
import NotFound from './pages/not-found'; // 404 page
import Property from './pages/property';
import Dashboard from './pages/dashboard';
import AddProperty from './components/property/add-property';
import EditProperty from './components/property/edit-property';
import Users from './pages/users';
import AddUser from './components/users/add-user';
import UserList from './components/users/userlist';
import { AuthProvider } from './context/auth-context'; // Import AuthProvider
import ProtectedRoute from './context/protected-route'; // Import ProtectedRoute
import AgentList from './components/users/agentlist';

const App: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="property" element={<Property />}>
            <Route index element={<AddProperty />} />
            <Route path="add" element={<AddProperty />} />
            <Route path="edit" element={<EditProperty />} />
          </Route>
          <Route path="users" element={<Users />}>
            <Route index element={<AddUser />} />
            <Route path="add" element={<AddUser />} />
            <Route path="view-users" element={<UserList />} />
            <Route path="view-agents" element={<AgentList />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
