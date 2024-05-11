import React from 'react';
import s from './Navigation.module.scss';

const Navigation = () => {
  return (
    <ul className={s.navigation}>
      <li className={s.active}>Сотрудники</li>
      <li>Тесты</li>
      <li>Отчеты</li>
    </ul>
  )
}

export default Navigation