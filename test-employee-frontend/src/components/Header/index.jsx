import React from 'react';
import s from './Header.module.scss';
import accountIcon from 'assets/img/account.svg';
import logoutIcom from 'assets/img/logout.svg';
import classNames from 'classnames';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/slices/userSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuth, role } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className={s.header}>
      <div className={s.container}>
        <Link to="/">
          <div className={s.logo}>
            <div className={s.gray}>Тестирование</div>
            <div className={s.red}>сотрудников</div>
          </div>
        </Link>
        {isAuth && (
          <div className={s.icons}>
            {role == 'Employee' && (
              <button className="button button--outline">История тестов</button>
            )}
            <img
              className={classNames(s.icon, s.icon_small)}
              src={logoutIcom}
              onClick={() => dispatch(removeUser())}
              alt="logout"
            />
            <img className={s.icon} src={accountIcon} alt="profile" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
