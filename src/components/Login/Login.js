import React from 'react';
import logo from '../../images/logo.svg';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";


function Login() {
  return (
    <main className="login">
      <div className="login__container">
        <div className="login__header">
        <Link to="/"><img className="login__logo" src={logo} alt="Логотип" /></Link>
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="login__form">

          <div className="login__field">
            <label className="login__label" for="email">E-mail</label>
            <input id="email" className="login__input login__input_email" required name="email" type="email"  placeholder="Email" />
            <span className="email-error login__error-message"></span>
          </div>

          <div className="login__field">
            <label className="login__label" for="password">Пароль</label>
            <input id="password" className="login__input" required name="password" type="password" placeholder="Пароль" />
            <span className="password-error login__error-message login__error"></span>
          </div>

          <button type="submit" className="login__submit-button">Войти</button>

        </form>
        <div className="login__entry">
          <p className="login__paragraph">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
      </div>
    </main>
  );
}

export default Login;