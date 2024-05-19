import { useAuth } from '../../hooks/useAuth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchTest } from '../../redux/slices/fullTestSlice';
import AddQuestion from '../../components/AddQuestion';
import QuestionTable from '../../components/QuestionTable';

const EditTest = () => {
  const { id } = useParams();

  const { role } = useAuth();

  const { name, timeTest, jobId, questions, status } = useSelector(({ fullTest }) => fullTest);

  const { items: jobs } = useSelector(({ jobs }) => jobs);

  const dispatch = useDispatch();

  const updateTable = () => {
    dispatch(
      fetchTest(id),
    );
  };

  React.useEffect(() => {
    updateTable();
  }, []);



  if (role !== 'Admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      {status == 'success' ? (
        <div>
          <h2>Тест: {name}</h2>
          <p>Должность: {jobs.find((el) => jobId == el.id)?.jobTitleName}</p>
          <p>Время теста: {timeTest}с.</p>
          <div className="filters">
            <AddQuestion testId={id} updateTable={updateTable} dispatch={dispatch}/>
          </div>
          <QuestionTable dispatch={dispatch} updateTable={updateTable} status={status} items={questions}/>
        </div>
      ) : (
        <h1>{status}...</h1>
      )}
    </div>
  );
};

export default EditTest;
