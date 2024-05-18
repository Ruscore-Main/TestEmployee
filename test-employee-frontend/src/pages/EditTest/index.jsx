import { useAuth } from '../../hooks/useAuth';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, json, useParams } from 'react-router-dom';
import { fetchTest } from '../../redux/slices/fullTestSlice';

const EditTest = () => {
  const { id } = useParams();

  const {role} = useAuth();

  const { name, timeTest, jobId, questions, status } = useSelector(
    ({ fullTest }) => fullTest
  );

  const {items: jobs} = useSelector(({jobs}) => jobs);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTest(id));
  }, []);


  if (role !== "Admin") {
    return <Navigate to='/' />
  }

  return <div className='container'>
    {status == 'success' ? 
    <div>
        <h2>{name}</h2>
        <p>Должность: {jobs.find(el => jobId == el.id)?.jobTitleName}</p>
        <p>Время теста: {timeTest}с.</p>
    </div>
    : <h1>{status}...</h1>}
  </div>;
};

export default EditTest;
