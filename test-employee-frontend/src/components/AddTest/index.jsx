import React, { useState } from 'react';
import s from './AddTest.module.scss';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getJobs } from '../../redux/slices/jobsSlice';
import classNames from 'classnames';
import swal from 'sweetalert';
import { addTest } from '../../redux/slices/testSlice';

const AddTest = ({ updateTable, dispatch }) => {
  const [isModal, setIsModal] = useState(false);
  const { items: jobs, status: jobsStatus } = useSelector(({ jobs }) => jobs);
  const [jobId, setJobId] = useState('');
  const [name, setName] = useState('');
  const [timeTest, setTimeTest] = useState('');
  const [textError, setTextError] = useState('');

  const onClickAdd = () => {
    setTextError('');
    dispatch(
      addTest({

        name,
        timeTest: +timeTest,
        jobId: +jobId,
      }),
    ).then((res) => {
      if (res.payload?.id !== undefined) {
        swal({
          icon: 'success',
          text: 'Тест успешно добавлен!',
        });
        setIsModal(false);
        updateTable();
      } else {
        setTextError(res.payload);
      }
    });
  };

  React.useEffect(() => {
    dispatch(getJobs());
  }, []);

  return (
    <>
      <button className="button button--outline" onClick={() => setIsModal(true)}>
        Добавить тест
      </button>

      <Modal show={isModal} onHide={() => setIsModal(false)} className="p-2">
        <Modal.Header closeButton>
          <Modal.Title>Добавление теста</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={s.container}>
            <input
              placeholder="Название"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Длительность теста в секундах"
              className="input"
              value={timeTest}
              type="number"
              onChange={(e) => setTimeTest(e.target.value)}
            />
            <select
              className={classNames('input', { disabled: jobsStatus !== 'success' })}
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}>
              {jobsStatus !== 'success' ? (
                <option disabled>{jobsStatus}</option>
              ) : (
                <>
                  <option disabled>Выберите вашу должность</option>
                  {jobs.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.jobTitleName}
                    </option>
                  ))}
                </>
              )}
            </select>
            <button
              className={classNames('button')}
              onClick={onClickAdd}>
              Добавить
            </button>
            <p className="not-valid">
              {textError}
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddTest;
