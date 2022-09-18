import React from 'react';
import logo from '../../images/logo.svg';
import { Link, withRouter } from "react-router-dom";

import validation from '../Validation/Validation';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validation = validation;
  }



  isFormValid() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
  });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    if (name === 'email'){
      this.setState({
        emailValid :  this.validation.validateInput(e.target)
      }, this.isFormValid)
    } else if (name === 'password'){
      this.setState({
        passwordValid :  this.validation.validateInput(e.target)
      }, this.isFormValid)
    }
  }

  handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    if (!this.state.email || !this.state.password){
      return;
    }
    this.props.handleSubmitLogin(this.state.email, this.state.password)
    .then((data) => {
      if (data){
        this.setState({email: '', password: ''} ,() => {
            this.props.handleLogin();
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            this.props.history.push('/movies');
        });
        localStorage.setItem('jwt', data.token);
      } else {
        return
      }
    });
  }

  render(){
    return(
      <main className="login">
        <div className="login__container">
          <div className="login__header">
          <Link to="/"><img className="login__logo" src={logo} alt="Логотип" /></Link>
            <h1 className="login__title">Рады видеть!</h1>
          </div>
          <form onSubmit={this.handleSubmit} className="login__form" noValidate>

            <div className="login__field">
              <label className="login__label" htmlFor="email">E-mail</label>
              <input id="email" className="login__input login__input_email" required name="email" type="email" placeholder="Email" value={this.state.email}  onChange={this.handleChange} />
              <span className="email-error error-message"></span>
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="password">Пароль</label>
              <input id="password" className="login__input" required name="password" type="password" placeholder="Пароль" value={this.state.password}  onChange={this.handleChange}/>
              <span className="password-error error-message"></span>
            </div>

            <button type="submit" className="login__submit-button" disabled={!this.state.formValid}>Войти</button>

          </form>
          <div className="login__entry">
            <p className="login__paragraph">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="login__link">Регистрация</Link>
          </div>
        </div>
      </main>
    )
  }
}

export default withRouter(Login);