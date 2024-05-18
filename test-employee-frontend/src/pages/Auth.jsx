import React from 'react';
import Authorization from '../components/Authorization';
import { useDispatch } from 'react-redux';

const Auth = () => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="auth">
        <div className="auth__header">
          <span className={'selected'}>
            АВТОРИЗАЦИЯ
          </span>
        </div>
        <Authorization dispatch={dispatch} />

      </div>
    </div>
  );
};

export default Auth;
