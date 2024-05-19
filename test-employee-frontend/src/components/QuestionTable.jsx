import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { deleteQuestion, updateQuestion } from '../redux/slices/fullTestSlice';
import swal from 'sweetalert';

const QuestionTable = ({ status, items, updateTable, dispatch }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentQuestionText, setCurrentQuestionText] = useState('');
  const onClickDelete = (id) => {
    dispatch(deleteQuestion(id)).then((res) => {
      if (res.payload?.id !== undefined) {
        updateTable();
        swal({
          icon: 'success',
          text: 'Вопрос успешно добавлен!',
        });
      } else {
        swal({
          icon: 'error',
          text: res.payload,
        });
      }
    });
  };

  const onClickEdit = (id, text) => {
    if (currentQuestion === id) {
      if (currentQuestionText !== "") {
        console.log({
          id: currentQuestion,
          questionText: currentQuestionText
        })
        dispatch(updateQuestion({
          id: currentQuestion,
          questionText: currentQuestionText
        })).then((res) => {
          if (res.payload?.id !== undefined) {
            updateTable();
            setCurrentQuestion(null);
            swal({
              icon: 'success',
              text: 'Вопрос успешно обновлен!',
            });
          } else {
            swal({
              icon: 'error',
              text: res.payload,
            });
          }
        })
      }
      else {
        swal({
          icon: 'warning',
          text: 'Вопрос не может быть пустым!',
        });
      }

    }
    setCurrentQuestion(id);
    setCurrentQuestionText(text);
  };
  return (
    <div className="container">
      <Table hover responsive striped className="mt-2 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Вопрос</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {status === 'success' ? (
            items.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td>
                  {currentQuestion == question.id ? (
                    <input
                      className="input"
                      value={currentQuestionText}
                      onChange={(e) => setCurrentQuestionText(e.target.value)}></input>
                  ) : (
                    question.questionText
                  )}
                </td>
                <td>{question.status}</td>
                <td>
                  <span
                    className="icon"
                    onClick={() => onClickEdit(question.id, question.questionText)}>
                    {currentQuestion == question.id ? '✅' : '📝'}
                  </span>
                </td>
                <td>
                  <span className="icon" onClick={() => onClickDelete(question.id)}>
                    ❌
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
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

export default QuestionTable;
