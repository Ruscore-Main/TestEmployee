import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchTest } from '../../redux/slices/fullTestSlice';
import { useAuth } from 'hooks/useAuth';
import { NotFound } from 'pages';
import Timer from 'components/Timer';
import CurrentQuestion from 'components/CurrentQuestion';
import swal from 'sweetalert';
import s from './TakeTest.module.scss'

const toTimeString = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const TakeTest = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { jobId: userJobId } = useAuth();
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { name, timeTest, jobId, questions, status } = useSelector(({ fullTest }) => fullTest);

  React.useEffect(() => {
    dispatch(fetchTest(id));
  }, []);

  if (status !== 'success') {
    return (
      <div className="container">
        <h1>{status}</h1>
      </div>
    );
  }

  if (userJobId !== jobId) {
    return <NotFound />;
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + timeTest);

  const onClickNext = () => {
    if (questionIndex+1 < questions.length) {
        setQuestionIndex(questionIndex+1)
    }
    else {
        swal({
            icon: "warning",
            text: "ТЕСТ ЗАВЕРШЕН"
        })
    }
  } 

  return (
    <div className="container">
      <h1>{name}</h1>
      <span>Общее время теста: {toTimeString(timeTest)}</span>
      {isTestStarted && (
        <div className={s.questionBlock}>
          <Timer
            expiryTimestamp={time}
            onEnd={() => {
              console.log('ТЕСТ ЗАВЕРШЕН');
            }}
          />
          <CurrentQuestion {...questions[questionIndex]} onClickNext={onClickNext}/>
        </div>
      )}
      {isTestStarted || <button className="button button--outline" onClick={() => setIsTestStarted(true)}>
        Начать
      </button>}
    </div>
  );
};

export default TakeTest;
