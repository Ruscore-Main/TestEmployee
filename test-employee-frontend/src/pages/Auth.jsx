import React from 'react';
import Authorization from '../components/Authorization';
import Registration from '../components/Registration';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../redux/slices/jobsSlice';

const Auth = () => {
  const [isAuth, setIsAuth] = React.useState(true);
  const dispatch = useDispatch();
  const {items, status} = useSelector(({jobs}) => jobs)

  React.useEffect(() => {
    dispatch(getJobs())
  }, [])

  return (
    <div className="container">
      <div className="auth">
        <div className="auth__header">
          <span className={classNames({ selected: isAuth })} onClick={() => setIsAuth(true)}>
            Вход
          </span>
          <span className={classNames({ selected: !isAuth })} onClick={() => setIsAuth(false)}>
            Регистрация
          </span>
        </div>

        {isAuth ? <Authorization dispatch={dispatch} /> : <Registration jobs={items} dispatch={dispatch} />}
      </div>
    </div>
  );
};

export default Auth;
