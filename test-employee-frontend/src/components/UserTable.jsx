import React from 'react';
import { Table } from 'react-bootstrap';

const getDate = (date) => {
  return new Date(date).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

const UserTable = ({ items, status, role }) => {
  return (
    <div className="container">
      <Table hover responsive striped className="mt-2 mb-4">
        <thead>
          <tr>
            <th>#</th>
            {role == "Director" || <th>Логин</th>}
            {role == "Director" || <th>Пароль</th>}
            <th>ФИО</th>
            <th>Должность</th>
            <th>Email</th>
            <th>Опыт работы</th>
            <th>Дата рождения</th>
            <th>Номер телефона</th>
          </tr>
        </thead>
        <tbody>
          {status === 'success' ? (
            items.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                {role == "Director" || <td>{user.login}</td>}
                {role == "Director" || <td>{user.password}</td>}
                <td>{user.fio || '-'}</td>
                <td>{user.jobId || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{user.workExperience ? `${user.workExperience} месяцев` : '-'}</td>
                <td>{user.dateOfBirth ? getDate(user.dateOfBirth) : '-'}</td>
                <td>{user.phoneNumber || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>...</td>
              <td>...</td>
              <td>...</td>
              <td>...</td>
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

export default UserTable;
