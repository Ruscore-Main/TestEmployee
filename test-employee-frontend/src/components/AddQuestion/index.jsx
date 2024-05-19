import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import s from './AddQuestion.module.scss'
import classNames from 'classnames';
import trash_delete from 'assets/img/trashcan_delete.svg';
import swal from 'sweetalert';
import { addQuestion } from '../../redux/slices/fullTestSlice';


const AddQuestion = ({testId, dispatch, updateTable}) => {
  const [isModal, setIsModal] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answerValue, setAnswerValue] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [isButtonBlocked, setIsButtonBlocked] = useState(false); 
  const [textError, setTextError] = useState('');

  const onClickAdd = () => {
    setIsButtonBlocked(true);
    dispatch(addQuestion({
      questionText,
      testId,
      answers
    })).then((res) => {
      if (res.payload?.id !== undefined) {
        updateTable();
        swal({
          icon: 'success',
          text: 'Вопрос успешно добавлен!',
        });
        closeModal();
      } else {
        setTextError(res.payload);
        setIsButtonBlocked(false);
      }
    });
  };

  const removeAnswer = (removeIndex) => {
    setAnswers([...answers.filter((_, i) => i != removeIndex)])
  }

  const onAddAnswer = () => {
    if (answers.some(el => el.answerText == answerValue)) {
      swal({
        title: "Повторяющийся ответ",
        text: "Поменяйте текст ответа",
        icon: "warning",
      });

      return
    }
    let newAnswer = {
      answerText: answerValue,
      isTrue: isTrue
    }
    setAnswers([...answers, newAnswer])
  }

  const closeModal = () => {
    setIsModal(false);
    setQuestionText('');
    setAnswers([]);
    setAnswerValue('');
    setIsTrue(false);
    setIsButtonBlocked(false);
    setTextError('');
  }

  return (
    <>
      <button className="button button--outline" onClick={() => setIsModal(true)}>
        Добавить вопрос
      </button>

      <Modal show={isModal} onHide={closeModal} className="p-2">
        <Modal.Header closeButton>
          <Modal.Title>Добавление вопроса</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={s.container}>
            <input
              placeholder="Вопрос"
              className="input"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <div className={s.addAnswer}>
              <input
                type="text"
                className="input"
                value={answerValue}
                onChange={(e) => setAnswerValue(e.target.value)}
              /> 
              <button className={classNames('button', {disabled: answerValue == ""})} onClick={onAddAnswer}>+</button>
              <span>True?</span><input type='checkbox' value={isTrue} onChange={() => setIsTrue(!isTrue)}/>
            </div>

            <h4>ОТВЕТЫ:</h4>
            {answers.map((el, i) => <div key={el.answerText+i} className={s.answer}>
              <input type="text" disabled className={`${s.answerInput} disable ${el.isTrue ? s.trueAnswer : s.falseAnswer}`} value={el.answerText}/>
              <img src={trash_delete} onClick={() => removeAnswer(i)} className={s.deleteAnswer}/>
            </div>)}

            <button className={classNames('button', {disabled: answers.length < 2 || isButtonBlocked || !(answers.some(el => el.isTrue) && answers.some(el => !el.isTrue))})} onClick={onClickAdd}>
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

export default AddQuestion;
