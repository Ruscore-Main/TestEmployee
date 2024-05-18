import React from 'react'
import { Table } from 'react-bootstrap';

const TestTable = ({status, items}) => {
    return (
        <div className="container">
          <Table hover responsive striped className="mt-2 mb-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Время теста</th>
                <th>ID должности</th>
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
                    <td>{test.jobId}</td>
                    <td><button className='button'>Изменить</button></td>

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

export default TestTable