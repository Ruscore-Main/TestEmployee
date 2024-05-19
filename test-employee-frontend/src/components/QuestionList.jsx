import React from 'react';
import { Table } from 'react-bootstrap';
import Pagination from './Pagination';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import {
  fetchQuestions,
  setCurrentQuestionPage,
  setSearchQuestion,
} from '../redux/slices/questionSlice';
import { deleteQuestion } from '../redux/slices/fullTestSlice';
import swal from 'sweetalert';

const QuestionList = () => {
  const { status, items, searchQuestion, currentQuestionPage, amountPages } = useSelector(
    ({ questions }) => questions,
  );

  const setSearch = (value) => dispatch(setSearchQuestion(value));
  const dispatch = useDispatch();

  const updateTable = () => {
    dispatch(
      fetchQuestions({
        searchValue: searchQuestion,
        page: currentQuestionPage,
      }),
    );
  };

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

  React.useEffect(() => {
    updateTable();
  }, [currentQuestionPage, searchQuestion]);

  React.useEffect(() => {
    updateTable();
  }, []);

  return (
    <div className="container">
      <h2>Список вопросов</h2>
      <div className="filters">
        <Search setSearchValue={setSearch} placeholder="Поиск вопроса" />
      </div>
      <Table hover responsive striped className="mt-2 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Вопрос</th>
            <th>Статус</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {status === 'success' ? (
            items.map((question) => (
              <tr key={question.id}>
                <td>{question.id}</td>
                <td>{question.questionText}</td>
                <td>{question.status}</td>
                <td>
                  <button className='button button--outline'>Утвердить</button>
                </td>
                <td>
                  <button className='button button--outline' onClick={() => onClickDelete(question.id)}>
                    Отклонить
                  </button>
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
      {amountPages < 2 ? (
        ''
      ) : (
        <Pagination
          currentPage={currentQuestionPage}
          amountPages={amountPages}
          setCurrentPage={(page) => dispatch(setCurrentQuestionPage(page))}
        />
      )}
    </div>
  );
};

export default QuestionList;
