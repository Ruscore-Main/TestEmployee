import React from 'react'
import s from './TestResult.module.scss'
import { useNavigate } from 'react-router-dom'

const TestResult = ({countTrue, countQuestions, spentTime}) => {
  const navigate = useNavigate();
  return (
    <div className={s.result}>
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Вы набрали {countTrue} из {countQuestions} баллов</h2>
      <h2>Потрачено времени: {spentTime} секунд</h2>
      <button onClick={() => navigate('/')}>Завершить тест</button>
    </div>
  )
}

export default TestResult