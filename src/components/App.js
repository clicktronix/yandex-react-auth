import React, { useState, useEffect, useCallback } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import Ducks from './Ducks.js';
import MyProfile from './MyProfile.js';
import ProtectedRoute from './ProtectedRoute';
import * as duckAuth from '../duckAuth.js';
import './styles/App.css';

export default function App() {
  // Задаем начальные значения для данных
  const initialData = {
    username: '',
    email: ''
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(initialData);
  const history = useHistory();

  // Оборачиваем функцию в useCallback, чтобы не было лишних ререндеров
  // В зависимости передаем history по требованию линтера, но можно обойтись и без этой зависимости: []
  const tokenCheck = useCallback(() => {
    // Получаем данные из localStorage по ключу 'jwt'
    const jwt = localStorage.getItem('jwt');

    // Проверяем хранится ли токен в localStorage
    if (jwt) {
      // Получаем данные пользователя
      duckAuth.getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setData({
              username: res.username,
              email: res.email
            })
            // После получения данных пользователя перенаправляем 
            history.push('/ducks');
          }
        })
        // Если возникла ошибка запроса, то перенаправляем пользователя на страницу логина
        .catch(() => history.push('/login'));
    }
  }, [history])

  // При рендере компонента запускаем метод для проверки наличия токена
  // В зависимости передаем tokenCheck по требованию линтера, но можно обойтись и без этой зависимости: []
  useEffect(() => {
    tokenCheck();
  }, [tokenCheck])

  // Метод обработки логина
  const handleLogin = ({ username, password }) => {
    return duckAuth.authorize(username, password).then(res => {
      // Секция для обработки ошибок запроса
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      if (res.jwt) {
        setLoggedIn(true);
        setData({
          username: res.user.username,
          email: res.user.email,
        })
        // Записываем полученный jwt токен в локальное хранилище
        localStorage.setItem('jwt', res.jwt);
      };
    });
  }

  // Метод обработки регистрации
  const handleRegister = ({ username, password, email }) => {
    return duckAuth.register(username, password, email).then(res => {
      // Секция для обработки ошибок запроса
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      return res;
    })
  }

  const handleSignOut = () => {
    // Удаляем токен из локального хранилища при логауте
    localStorage.removeItem('jwt');
    // Возвращаем пользовательские данные к начальному состоянию
    setData(initialData);
    setLoggedIn(false);
    // Перенаправляем пользователя на страницу логина
    history.push('/login');
  }

  return (
    <Switch>
      <ProtectedRoute path="/ducks" loggedIn={loggedIn} onSignOut={handleSignOut} component={Ducks} />
      <ProtectedRoute path="/my-profile" loggedIn={loggedIn} userData={data} onSignOut={handleSignOut} component={MyProfile} />
      <Route path="/login">
        <div className="loginContainer">
          <Login onLogin={handleLogin} tokenCheck={tokenCheck} />
        </div>
      </Route>
      <Route path="/register">
        <div className="registerContainer">
          <Register onRegister={handleRegister} />
        </div>
      </Route>
      <Route>
        {loggedIn ? <Redirect to="/ducks" /> : <Redirect to="/login" />}
      </Route>
    </Switch>
  )
}
