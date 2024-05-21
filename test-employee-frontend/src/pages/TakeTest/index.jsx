import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { fetchTest } from '../../redux/slices/fullTestSlice';
import { useAuth } from 'hooks/useAuth';
import { NotFound } from 'pages';
import Timer from 'components/Timer';
import CurrentQuestion from 'components/CurrentQuestion';
import swal from 'sweetalert';
import s from './TakeTest.module.scss';
import TestResult from 'components/TestResult';
import { setTestResult } from '../../redux/slices/userSlice';


const toTimeString = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8);

const TakeTest = () => {
  const { id } = useParams();
  const {isAuth, id: userId} = useAuth();
  const dispatch = useDispatch();
  const { jobId: userJobId } = useAuth();
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestEnded, setIsTestEnded] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [countTrue, setCountTrue] = useState(0);
  const spentTime = useRef(0)

  const { name, timeTest, jobId, questions, status } = useSelector(({ fullTest }) => fullTest);

  React.useEffect(() => {
    spentTime.current = 0;
    dispatch(fetchTest(id));
  }, []);

  if (!isAuth) {
    return <Navigate to="/" />;
  }

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
  console.log(countTrue)
  const onEnd = (resultBall) => {
    setIsTestEnded(true);
    console.log("RESULTTTT ", countTrue);

    dispatch(setTestResult({
      userId,
      testId: id,
      timeSpent: spentTime.current,
      countTrueAnswers: resultBall,
      countQuestions: questions.length,
      datePassing: (new Date()).toISOString() 
    }))
  } 

  const onClickNext = (ball) => {
    setCountTrue(countTrue + ball);
    if (questionIndex + 1 >= questions.length) {
      onEnd(countTrue + ball);
      return;
    }

    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div className="container">
      <h1>{name}</h1>
      <p>Общее время теста: {toTimeString(timeTest)}</p>
      {(isTestStarted && !isTestEnded) && (
        <div className={s.questionBlock}>
          <Timer
            expiryTimestamp={time}
            setSpentTime={(val) => {
              spentTime.current = timeTest-val
            }}
            onEnd={() => {
              console.log('ТЕСТ ЗАВЕРШЕН');
            }}
          />
          <div className={s.progress}>
            <div style={{ width: `${(questionIndex/questions.length)*100}%` }} className={s.progress__inner}></div>
          </div>
          <CurrentQuestion {...questions[questionIndex]} onClickNext={(ball) => onClickNext(ball)} />
        </div>
      )}
      {isTestEnded && <TestResult countTrue={countTrue} countQuestions={questions.length} spentTime={spentTime.current}/>}
      {isTestStarted || (
        <button className="button button--outline" onClick={() => setIsTestStarted(true)}>
          Начать
        </button>
      )}
    </div>
  );
};

export default TakeTest;
