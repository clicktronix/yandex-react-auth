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
  const initialData = {
    username: '',
    email: ''
  }
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState(initialData);
  const history = useHistory();

  const tokenCheck = useCallback(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      duckAuth.getContent(jwt)
        .then((res) => {
          if (res) {
            setData({
              username: res.username,
              email: res.email
            })
            setLoggedIn(true);
          }
        })
        .catch(() => history.push('/login'));
    }
  }, [history])

  useEffect(() => {
    tokenCheck();
  }, [])

  const handleLogin = ({ username, password }) => {
    return duckAuth.authorize(username, password).then(res => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      if (res.jwt) {
        setLoggedIn(true);
        setData({
          username: res.user.username,
          email: res.user.email,
        })
        localStorage.setItem('jwt', res.jwt);
      };
    });
  }

  const handleRegister = ({ username, password, email }) => {
    return duckAuth.register(username, password, email).then(res => {
      if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
      return res;
    })
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setData(initialData);
    setLoggedIn(false);
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
