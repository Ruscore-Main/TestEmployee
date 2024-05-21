import React, { useState } from 'react';
import s from './CurrentQuestion.module.scss';

const CurrentQuestion = ({ id, questionText, answers, onClickNext }) => {
  let countTrue = answers.filter((el) => el.isTrue).length;
  let [countCurrentBall, setCountCurrentBall] = useState(0);

  const [checkedState, setCheckedState] = useState(new Array(answers.length).fill(false));

  const handleOnChange = (position) => {
    let updatedCheckedState =
      countTrue > 1
        ? checkedState.map((item, index) => (index === position ? !item : item))
        : checkedState.map((item, index) => index === position);

    setCheckedState(updatedCheckedState);

    let countTrueI = 0;
    const answersIndexes = answers.map((el) => el.isTrue);
    for (let i = 0; i < answers.length; i++) {
      if (updatedCheckedState[i] === answersIndexes[i] && answersIndexes[i]) {
        countTrueI++;
      }
    }
    console.log('COUNT TRUE = ', countTrueI);
    console.log('COUNT % = ', countTrueI / countTrue);
    setCountCurrentBall(countTrueI / countTrue);
  };

  React.useEffect(() => {
    countTrue = answers.filter((el) => el.isTrue).length;
    setCountCurrentBall(0);

    setCheckedState(new Array(answers.length).fill(false));
  }, [id]);

  return (
    <div className={s.container}>
      <p>{questionText}</p>
      <fieldset>
        {answers.map((el, index) =>
          countTrue > 1 ? (
            <p key={el.id}>
              <input
                type="checkbox"
                name="group2"
                value={el.id}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />{' '}
              {el.answerText}
            </p>
          ) : (
            <p key={el.id}>
              <input
                type="radio"
                name="group1"
                value={el.id}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />{' '}
              {el.answerText}
            </p>
          ),
        )}
      </fieldset>
      <button className="button" onClick={() => onClickNext(countCurrentBall)}>
        Далее
      </button>
    </div>
  );
};

export default CurrentQuestion;
