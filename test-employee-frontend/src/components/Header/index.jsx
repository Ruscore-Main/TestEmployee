import React from 'react';
import s from './Header.module.scss';
import accountIcon from 'assets/img/account.svg';
import logoutIcom from 'assets/img/logout.svg';
import classNames from 'classnames';

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logo}>
          <div className={s.gray}>Тестирование</div>
          <div className={s.red}>сотрудников</div>
        </div>

        <div className={s.icons}>
          <img className={classNames(s.icon, s.icon_small)} src={logoutIcom} alt="logout" />
          <img className={s.icon} src={accountIcon} alt="profile" />
          <button className="button button--outline">Войти</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
