import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <Link to="/"><img src={logo} alt="Логотип" className="header__logo"/></Link>
      {props.children}
    </header>
  );
}

export default Header;