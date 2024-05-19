import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AdminPage from './AdminPage';
import DirectorPage from './DirectorPage';

const Home = () => {
  const { isAuth, role } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <div>
    {role == "Admin" && <AdminPage />}
    {role == "Director" && <DirectorPage />}
  </div>;
};

export default Home;
