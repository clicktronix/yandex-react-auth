import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Register.css';

export default function Register({ onRegister }) {
  const initialData = {
    username: '',
    email: '',
    password: '',
  };
  const [data, setData] = useState(initialData);
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(data => ({
      ...data,
      [name]: value,
    }));
  }

  const resetForm = () => {
    setData(initialData);
    setMessage('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!data.username || !data.password || !data.email) {
      return;
    }

    onRegister(data)
      .then(resetForm)
      .then(() => history.push('/login'))
      .catch(err => setMessage(err.message || 'Что-то пошло не так'))
  }

  return (
    <div className="register">
      <Logo title={'CryptoDucks'} />
      <p className="register__welcome">
        Пожалуйста, зарегистрируйтесь.
        </p>
      <p className="register__error">
        {message}
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <label htmlFor="username">
          Логин:
          </label>
        <input id="username" name="username" type="text" value={data.username} onChange={handleChange} />
        <label htmlFor="email">
          Email:
          </label>
        <input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
          </label>
        <input id="password" name="password" type="password" value={data.confirmPassword} onChange={handleChange} />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="login" className="register__login-link">Войти</Link>
      </div>
    </div>
  )
}
