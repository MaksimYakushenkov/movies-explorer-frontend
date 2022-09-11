import React from 'react';
import logo from '../../images/logo.svg';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";


function Register() {
  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <Link to="/"><img className="register__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form className="register__form" noValidate>

          <div className="register__field">
            <label className="register__label" for="name">Имя</label>
            <input id="name" className="register__input" required name="name" type="text" placeholder="Имя" />
            <span className="name-error register__error-message"></span>
          </div>

          <div className="register__field">
            <label className="register__label" for="email">E-mail</label>
            <input id="email" className="register__input register__input_email" required name="email" type="email"  placeholder="Email" />
            <span className="email-error register__error-message"></span>
          </div>

          <div className="register__field">
            <label className="register__label" for="password">Пароль</label>
            <input id="password" className="register__input" required name="password" type="password" placeholder="Пароль" />
            <span className="password-error register__error-message register__error"></span>
          </div>

          <button type="submit" className="register__submit-button">Зарегистрироваться</button>

        </form>
        <div className="register__entry">
          <p className="register__paragraph">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__link">Войти</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;