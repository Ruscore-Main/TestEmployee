import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { Navigate } from 'react-router-dom';
import AdminPage from './AdminPage';
import DirectorPage from './DirectorPage';
import EmployeePage from './EmployeePage';

const Home = () => {
  const { isAuth, role } = useAuth();

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return <div>
    {role == "Admin" && <AdminPage />}
    {role == "Director" && <DirectorPage />}
    {role == "Employee" && <EmployeePage />}
  </div>;
};

export default Home;
