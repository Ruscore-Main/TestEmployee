import Pagination from 'components/Pagination';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchTests, setCurrentTestPage } from '../../redux/slices/testSlice';
import TestItem from 'components/TestItem';
import s from './EmployeePage.module.scss';

const EmployeePage = () => {
  const { isAuth, fio, jobTitle, jobId, testResults } = useAuth();
  const dispatch = useDispatch();
  const { items, status, currentPage, amountPages } = useSelector(({ tests }) => tests);

  React.useEffect(() => {
    dispatch(
      fetchTests({
        page: currentPage,
        jobId,
      }),
    );
  }, [testResults]);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <h2>Добро пожаловать, {fio}!</h2>
      <h2 className={s.titleTests}>
        Тесты для должности <span>{jobTitle}</span>
      </h2>
      {status == 'loading' ? (
        <h1>Loading...</h1>
      ) : (
        <div className={s.testList}>
          {items.map((test) => (
            <TestItem
              key={test.id}
              id={test.id}
              title={test.name}
              timeTest={test.timeTest}
              jobTitle={test.jobTitle}
              testResults={testResults}
            />
          ))}
        </div>
      )}

      {amountPages < 2 ? (
        ''
      ) : (
        <Pagination
          currentPage={currentPage}
          amountPages={amountPages}
          setCurrentPage={(page) => dispatch(setCurrentTestPage(page))}
        />
      )}
    </div>
  );
};

export default EmployeePage;
