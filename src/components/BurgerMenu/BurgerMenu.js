import React from 'react';
import { Link } from "react-router-dom";

function BurgerMenu() {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened]  = React.useState(false);

  function burgerMenuOpen() {
    setIsBurgerMenuOpened(true);
  }

  function burgerMenuClose() {
    setIsBurgerMenuOpened(false);
  }

  return (
    <div  className="burger">
      <div onClick={burgerMenuOpen} className="burger__button">
        <div className="burger__line"></div>
        <div className="burger__line"></div>
        <div className="burger__line"></div>
      </div>
      <div className={`burger__navigation ${isBurgerMenuOpened && 'burger__navigation_opened'}`}>
        <div className="burger__navtab">
          <Link to="/" className="burger__link">Главная</Link>
          <Link to="/movies" className="burger__link burger__link_active">Фильмы</Link>
          <Link to="/saved-movies" className="burger__link">Сохраненные фильмы</Link>
        </div>
        <Link to="/profile" className="burger__link_profile">Аккаунт</Link>
        <div onClick={burgerMenuClose} className="burger__close-button"></div>
      </div>
    </div>
  );
}

export default BurgerMenu;