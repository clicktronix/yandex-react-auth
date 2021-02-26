import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from './Logo.js';
import './styles/Login.css';

export default function Login({ onLogin }) {
  const initialData = {
    username: '',
    password: '',
  }
  const [data, setData] = useState(initialData);
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      history.push('/ducks')
    }
  }, [history])

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

    if (!data.username || !data.password) {
      return;
    }

    onLogin(data)
      .then(resetForm)
      .then(() => history.push('/ducks'))
      .catch(err => setMessage(err.message || 'Что-то пошло не так'))
  }

  return (
    <div onSubmit={handleSubmit} className="login">
      <Logo title={'CryptoDucks'} />
      <p className="login__welcome">
        Это приложение содержит конфиденциальную информацию.
        Пожалуйста, войдите или зарегистрируйтесь, чтобы получить доступ к CryptoDucks.
        </p>
      <p className="login__error">
        {message}
      </p>
      <form className="login__form">
        <label htmlFor="username">
          Логин:
          </label>
        <input id="username" required name="username" type="text" value={data.username} onChange={handleChange} />
        <label htmlFor="password">
          Пароль:
          </label>
        <input id="password" required name="password" type="password" value={data.password} onChange={handleChange} />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>

      <div className="login__signup">
        <p>Ещё не зарегистрированы?</p>
        <Link to="/register" className="signup__link">Зарегистрироваться</Link>
      </div>
    </div>
  )
}