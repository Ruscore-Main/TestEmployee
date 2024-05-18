import React from 'react';
import NotFoundBlock from '../components/NotFoundBlock';
import { Navigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth';

const NotFound = () => {
  const {isAuth} = useAuth();

  if (!isAuth) {
    return <Navigate to="/login"/>
  }

  return <NotFoundBlock />;
};

export default NotFound;
