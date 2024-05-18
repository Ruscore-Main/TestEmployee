import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AdminPage from './AdminPage';

const Home = () => {
  const { isAuth, role } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <div>
    {role == "Admin" && <AdminPage />}
  </div>;
};

export default Home;
