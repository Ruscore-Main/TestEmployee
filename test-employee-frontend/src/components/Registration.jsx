import classNames from 'classnames';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { regUser } from '../redux/slices/userSlice';

import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import { getJobs } from '../redux/slices/jobsSlice';

export const CheckDate = (str) => {

  if (str === '') return true

  str = str.split('.').reverse();
  let cur = new Date();
  let date = new Date(str);

  cur.setHours(0, 0, 0, 0); // обнулим время
  return date !== null && (date.getFullYear() > 1900) && date.getFullYear() <= (cur.getFullYear() - 18);
};

const isValidRegistration = (login, email, phoneNumber, dateOfBirth, pas, pasr) => {
  const isEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  const isPhoneNumber = /^[\d\+][\d\(\)\ -]{4,10}\d$/;
  let maxNumberLength = 11;
  if (phoneNumber.startsWith('+')) {
    maxNumberLength = 12;
  }
  if (login.length === 0 && pas.length === 0) return '';
  if (login.length < 6) return 'Логин должен содержать больше 5 символов!';
  if (!isEmail.test(email)) return 'Email введен неверно!';
  if (!isPhoneNumber.test(phoneNumber) || phoneNumber.length !== maxNumberLength)
    return 'Номер телефна введен неверно!';
  if (!CheckDate(dateOfBirth)) return 'Дата рождения введена неверно!';
  if (pas.length <= 5) return 'Пароль должен содержать больше 5 символов!';
  if (pas != pasr) return 'Пароли должны совпадать!';
  return 'Успешно!';
};

const Registration = ({ dispatch, isAdmin = false, closeModal = null, updateTable }) => {
  const navigate = useNavigate();
  const {items: jobs, status} = useSelector(({jobs}) => jobs)

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [fio, setFio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [jobId, setJobId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  const [textError, setTextError] = useState('');


  

  let isValid = isValidRegistration(login, email, phoneNumber, dateOfBirth, password, passwordR);


  

  const onClickRegister = () => {
      setTextError("");
      dispatch(
      regUser({
        login,
        password,
        fio,
        workExperience,
        dateOfBirth,
        email,
        phoneNumber,
        jobId
      }),
    ).then((res) => {
      if (res.payload?.login !== undefined && !isAdmin) {
        navigate("/");
      } else if (res.payload?.login !== undefined && isAdmin) {
        swal({
          icon: "success",
          text: "Сотрудник успешно добавлен!"
        });
        closeModal && closeModal();
        updateTable();
      } else {
        setTextError(res.payload);
      }
    });
  };

  React.useEffect(() => {
    dispatch(getJobs()).then(res => {
      if (res.payload?.length > 0) {
        setJobId(res.payload[0]?.id);
      }
    });
  }, [])

  return (
    <>
      <div className="auth__body">
        <input
          placeholder="Логин"
          className="auth__input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          placeholder="Email"
          className="auth__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="ФИО"
          className="auth__input"
          value={fio}
          onChange={(e) => setFio(e.target.value)}
        />
        <input
          placeholder="+7 (YYY) XXX XX XX"
          type="tel"
          maxLength={12}
          className="auth__input"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="date"
          className="auth__input"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <input
          placeholder="12 месяцев"
          type="number"
          className="auth__input"
          value={workExperience}
          onChange={(e) => setWorkExperience(e.target.value)}
        />
        <select className={classNames("auth__input", {disabled: status !== 'success'})} value={jobId} onChange={(e) => setJobId(e.target.value)}>
          {status !== 'success' && <option>{status}</option> }
          <option disabled>Выберите вашу должность</option>
          {jobs.map(el => <option key={el.id} value={el.id}>{el.jobTitleName}</option>)}
        </select>
        <input
          placeholder="Пароль"
          type="password"
          className="auth__input"
          value={password}
          autoComplete="new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Подтвердите пароль"
          type="password"
          className="auth__input"
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
        />
      </div>

      <button
        className={classNames('button', { disabled: isValid !== 'Успешно!' })}
        onClick={onClickRegister}>
        {isAdmin ? 'Добавить' : 'Зарегистрироваться'}
      </button>
      <p className="not-valid">
        {textError} {isValid !== 'Успешно!' ? isValid : ''}
      </p>
    </>
  );
};

export default Registration;
