import { useAuth } from 'hooks/useAuth'
import React, { useState } from 'react'
import s from './ProfileBlock.module.scss'
import { CheckDate } from 'components/Registration';
import classNames from 'classnames';
import { updateUser } from '../../redux/slices/userSlice';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';


const isValidUpdate = (login, fio, email, dateOfBirth, phoneNumber) => {
  const isEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
  const isPhoneNumber = /^[\d\+][\d\(\)\ -]{4,10}\d$/;
  let maxNumberLength = 11;
  if (phoneNumber.startsWith('+')) {
    maxNumberLength = 12;
  }
  if (login.length === 0) return '';
  if (login.length < 6) return 'Логин должен содержать больше 5 символов!';
  if (!isEmail.test(email)) return 'Email введен неверно!';
  if (!isPhoneNumber.test(phoneNumber) || phoneNumber.length !== maxNumberLength)
    return 'Номер телефна введен неверно!';
  if (!CheckDate(dateOfBirth)) return 'Дата рождения введена неверно!';
  return 'Успешно!';
};

const ProfileBlock = () => {
  const user = useAuth();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(user.login);
  const [fio, setFio] = useState(user.fio);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const date = dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const [textError, setTextError] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  
  const onSaveClick = () => {
    setTextError("");
    dispatch(updateUser({...user, login, fio, email, dateOfBirth, phoneNumber})).then((res) => {
      if (res.payload?.login !== undefined) {
        swal({
          icon: "success",
          text: "Успешно обновлено!"
        })
        setTextError('');
      } else {
        setTextError(res.payload || "Сервер не отвечает...");
      }
    });
  }

  const isValid = isValidUpdate(login, fio, email, dateOfBirth, phoneNumber);

  React.useEffect(() => {
    setIsDisabled(isValid !== "Успешно!");
  }, [login, fio, email, dateOfBirth, phoneNumber])

  React.useEffect(() => { setIsDisabled(true) }, [])
  
  return (
    <div className={s.user}>
      <h2>Данные {user.role}</h2>
      <div className={s.data}>
        <span>Логин: </span>
        <input type="text" placeholder="Логин" className="input" value={login} onChange={(e) => setLogin(e.target.value)} />
      </div>
      <div className={s.data}>
        <span>ФИО: </span>
        <input type="text" placeholder="Email" className="input" value={fio} onChange={(e) => setFio(e.target.value)} />
      </div>
      <div className={s.data}>
        <span>Дата рождения: </span>
        <input type="date" className="input" value={date} onChange={(e) => setDateOfBirth(e.target.value)} />
      </div>
      <div className={s.data}>
        <span>Email: </span>
        <input type="text" placeholder="Email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={s.data}>
        <span>Номер телефона: </span>
        <input type="text" placeholder="Номер телефона" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <p className='not-valid'>{textError} {isValid !== "Успешно!" ? isValid : ''}</p>
      <button className={classNames('button button--outline', { disabled: isDisabled })} onClick={onSaveClick}>Сохранить</button>
    </div>
  )
}

export default ProfileBlock