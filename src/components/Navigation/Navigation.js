import React from 'react';
import { Link } from "react-router-dom";
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation(props) {
  return (
    <div className="navigation">
      <div className="navigation__link-container">
        {props.place !== "aboutProject" ?
        <>
        <Link to="/movies" className="navigation__link navigation__link_active">Фильмы</Link>
        <Link to="/saved-movies" className="navigation__link">Сохраненные фильмы</Link>
        </>
        : ''}
      </div>
      <div className="navigation__auth">
        {props.place !== "aboutProject" ?
        <>
        <Link to="/profile" className="navigation__auth-profile">Аккаунт</Link>
        </>
        :
        <>
        <Link to="/signup" className="navigation__auth-link">Регистрация</Link><Link to="/signin" className="navigation__auth-link navigation__auth-link_button">Войти</Link>
        </>
        }
      </div>
      {props.place !== "aboutProject" ?
      <BurgerMenu />
      : '' }
    </div>
  );
}

export default Navigation;