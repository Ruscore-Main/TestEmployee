import { useAuth } from 'hooks/useAuth';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getTestResults } from '../redux/slices/userSlice';

const TestResults = () => {
  const { id, isAuth } = useAuth();
  const [status, setStatus] = useState('loading');
  const { testResults } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setStatus('loading')
    dispatch(getTestResults(id)).then((res) => {
      setStatus('success')
    }).catch(err => setStatus('error'));
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <Table hover responsive striped className="mt-2 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Название теста</th>
            <th>Затраченное время</th>
            <th>Кол-во верных ответов</th>
            <th>Кол-во вопросов</th>
            <th>% верности решения</th>
            <th>Дата прохождения</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {status === 'success' ? (
            testResults.map((testResult) => (
              <tr key={testResult.id}>
                <td>{testResult.id}</td>
                <td>{testResult.testName}</td>
                <td>{testResult.timeSpent}</td>
                <td>{testResult.countTrueAnswers}</td>
                <td>{testResult.countQuestions}</td>
                <td>{Math.floor((testResult.countTrueAnswers/testResult.countQuestions)*100)}%</td>
                <td>{(new Date(testResult.datePassing)).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TestResults;
