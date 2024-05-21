import React from 'react';
import s from './TestItem.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const toTimeString = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const TestItem = ({ id, title, timeTest, jobTitle, testResults }) => {
  const navigate = useNavigate();
  return (
    <div className={s.container}>
      <h5>{title}</h5>
      <span>
        <em>Время:</em> {toTimeString(timeTest)}
      </span>
      <span>
        <em>Должность:</em> {jobTitle}
      </span>
      {testResults?.some((el) => el.testId == id) ? (
        <button className="button disabled">Тест уже пройден</button>
      ) : (
        <button className="button" onClick={() => navigate(`take-test/${id}`)}>
          Пройти
        </button>
      )}
    </div>
  );
};

export default TestItem;
