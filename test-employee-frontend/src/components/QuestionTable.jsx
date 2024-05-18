import React from 'react'
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const QuestionTable = ({ status, items }) => {
    <div className="container">
      <Table hover responsive striped className="mt-2 mb-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Время теста</th>
            <th>Должность</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {status === 'success' ? (
            items.map((test) => (
              <tr key={test.id}>
                <td>{test.id}</td>
                <td>{test.name}</td>
                <td>{test.timeTest}</td>
                <td>{jobs.find(el => test.jobId == el.id)?.jobTitleName}</td>
                <td>
                  <Link to={`edit-test/${test.id}`}>
                    <button className="button">Изменить</button>
                  </Link>
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
}

export default QuestionTable