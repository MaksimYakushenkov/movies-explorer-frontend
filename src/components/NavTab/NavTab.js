import React from 'react';

function NavTab() {
  return (
    <div className="navtab">
      <div className="navtab__link-container">
        <a href="#aboutProject" className="navtab__link">О проекте</a>
      </div>
      <div className="navtab__link-container">
      <a href="#techs" className="navtab__link">Технологии</a>
      </div>
      <div className="navtab__link-container">
      <a href="#aboutMe" className="navtab__link">Студент</a>
      </div>
    </div>
  );
}

export default NavTab;