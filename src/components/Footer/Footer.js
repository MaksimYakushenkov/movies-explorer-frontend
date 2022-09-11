import React from 'react';
import Stroke from '../Stroke/Stroke';

function Footer(props) {
  return (
    <footer className="footer">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <Stroke additional="stroke_footer" />
      <div className="footer__container">
        <p className="footer__copyright">&copy;&nbsp;2022</p>
        <div className="footer__links-container">
          <a className="footer__link" href="/" target="__blank">Яндекс.Практикум</a>
          <a className="footer__link" href="/" target="__blank">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;