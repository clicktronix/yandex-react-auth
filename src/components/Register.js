import React, { Button } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from './Logo.js';
import * as duckAuth from '../duckAuth.js';
import './styles/Register.css';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }
  handleSubmit(e){
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword){
      let { username, password, email } = this.state;
      duckAuth.register(username, password, email).then((res) => {
        if(res.statusCode !== 400){
          this.setState({
            message: ''
          }, () => {
            this.props.history.push('/login');
          })
        } else {
          this.setState({
            message: 'Что-то пошло не так!'
          })
        }
      });
    }
  }
  render(){
    return(
      <div className="register">
        <Logo title={'CryptoDucks'}/>
        <p className="register__welcome">
          Пожалуйста, зарегистрируйтесь.
        </p>
        <p className="register__error">
          {this.state.message}
        </p>
        <form onSubmit={this.handleSubmit} className="register__form">
          <label for="username">
            Логин:
          </label>
          <input id="username" name="username" type="text" value={this.state.username} onChange={this.handleChange} />
          <label for="email">
            Email:
          </label>
          <input id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
          <label for="password">
            Пароль:
          </label>
          <input id="password" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
          <label for="confirmPassword">
            Подтвердите пароль:
          </label>
          <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} />
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
}

export default withRouter(Register);