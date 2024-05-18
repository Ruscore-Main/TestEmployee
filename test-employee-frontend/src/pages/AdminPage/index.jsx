import UserList from 'components/UserList';
import React, { useState } from 'react';
import s from './AdminPage.module.scss';
import ProfileBlock from 'components/ProfileBlock';
import Navigation from 'components/Navigation';
import { useAuth } from 'hooks/useAuth';
import { Navigate, Route, Routes } from 'react-router-dom';
import TestList from 'components/TestList';
import ReportList from 'components/ReportList';

const navigationItems = [
  'Профиль',
  'Сотрудники',
  'Тесты',
  'Отчеты'
];

const AdminPage = () => {
  const { isAuth } = useAuth();
  const [activeNav, setActiveNav] = useState(0);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className={s.container}>
        { navigationItems[activeNav] == "Профиль" && <ProfileBlock /> }
        { navigationItems[activeNav] == "Сотрудники" && <UserList /> }
        { navigationItems[activeNav] == "Тесты" && <TestList /> }
        { navigationItems[activeNav] == "Отчеты" && <ReportList /> }
        <Navigation items={navigationItems} active={activeNav} setActive={setActiveNav} />
      </div>
    </div>
  );
};

export default AdminPage;
