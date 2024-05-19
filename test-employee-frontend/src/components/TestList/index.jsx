import TestTable from 'components/TestTable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTests, setCurrentTestPage } from '../../redux/slices/testSlice';
import AddTest from '../../components/AddTest';
import Pagination from 'components/Pagination';
import { getJobs } from '../../redux/slices/jobsSlice';

const TestList = () => {
  const { items, status, currentPage, amountPages } = useSelector(({ tests }) => tests);
  const dispatch = useDispatch();
  

  const updateTable = () => {
    dispatch(
      fetchTests({
        page: currentPage,
      })
    );
  };

  useEffect(() => {
    updateTable();
  }, [currentPage]);

  React.useEffect(() => {
    dispatch(getJobs())
  }, [])

  return (
    <div>
      <h2>Список тестов</h2>
      <div className="filters">
        <AddTest updateTable={updateTable} dispatch={dispatch}/>
      </div>
      <TestTable items={items} status={status} />
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

export default TestList;
