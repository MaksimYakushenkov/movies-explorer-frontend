import React from 'react';
import logo from '../../images/logo.svg';
import { Link, withRouter, Redirect } from "react-router-dom";
import infoOk from '../../images/info_ok.svg';
import infoError from '../../images/info_error.svg';
import validation from '../Validation/Validation';

class Register extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
      errorMessage: '',
      errorVisible: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validation = validation;
  }

  isFormValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid
  });
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
    if (name === 'name') {
      this.setState({
        nameValid :  this.validation.validateInput(e.target)
      }, this.isFormValid)
    } else if (name === 'email'){
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

    // Блокируем поля формы во время выполнения запроса
    this.props.setIsInputBlocked(true);

    this.setState({
      errorMessage: '',
      errorVisible: false,
    });

    this.props.handleSubmitRegister(this.state.name, this.state.email, this.state.password)
    .then((res) => {
      this.props.setIsInputBlocked(false);
      if(res !== 'invalidEmail' && res !== 'emailIsBusy'){
        this.props.openInfo({
          text: 'Вы успешно зарегистрировались!',
          path: 'movies',
          img: infoOk
        });
      } else if (res === 'emailIsBusy') {
        this.setState({
          errorMessage: 'Данный Email принадлежит другому пользователю!',
          errorVisible: true,
        });
      } else if (res === 'invalidEmail') {
        this.setState({
          errorMessage: 'Неверный Email',
          errorVisible: true,
        });
      } else {
        this.props.openInfo({
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
          path: 'signup',
          img: infoError
        });
      }
    })
  }

  render(){
    return(
      this.props.isLoggedIn ?
      <Redirect to="./movies" />
      :
      <>
      <main className="register">
        <div className="register__container">
          <div className="register__header">
            <Link to="/"><img className="register__logo" src={logo} alt="Логотип" /></Link>
            <h1 className="register__title">Добро пожаловать!</h1>
          </div>
          <form onSubmit={this.handleSubmit} className="register__form" noValidate>

            <div className="register__field">
              <label className="register__label" htmlFor="name">Имя</label>
              <input id="name" className="register__input" required name="name" type="text" placeholder="Имя" value={this.state.name} onChange={this.handleChange}  disabled={this.props.isInputBlocked}/>
              <span className="name-error error-message"></span>
            </div>

            <div className="register__field">
              <label className="register__label" htmlFor="email">E-mail</label>
              <input id="email" className="register__input register__input_email" required name="email" type="email"  placeholder="Email" value={this.state.email}  onChange={this.handleChange}  disabled={this.props.isInputBlocked}/>
              <span className="email-error error-message"></span>
            </div>

            <div className="register__field">
              <label className="register__label" htmlFor="password">Пароль</label>
              <input id="password" className="register__input" required name="password" type="password" placeholder="Пароль" value={this.state.password}  onChange={this.handleChange}  disabled={this.props.isInputBlocked}/>
              <span className="password-error error-message"></span>
            </div>
            <span className={`error-message ${this.state.errorVisible ? 'error_visible' : ''}`}>{this.state.errorMessage}</span>
            <button type="submit" className="register__submit-button" disabled={!this.state.formValid}>Зарегистрироваться</button>

          </form>
          <div className="register__entry">
            <p className="register__paragraph">Уже зарегистрированы?</p>
            <Link to="/signin" className="register__link">Войти</Link>
          </div>
        </div>
      </main>
      </>
    )
  }
}

export default withRouter(Register);