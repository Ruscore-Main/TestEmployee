import React from 'react';
import s from './Navigation.module.scss';

const Navigation = ({ items, active, setActive }) => {
  return (
    <ul className={s.navigation}>
      {items.map((el, i) => (
        <li key={i} onClick={() => setActive(i)} className={i == active ? s.active : ''}>
          {el}
        </li>
      ))}
    </ul>
  );
};

export default Navigation;
