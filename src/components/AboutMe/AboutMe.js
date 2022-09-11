import React from 'react';
import portfolioItem from '../../images/aboutMe__portfolio-item.svg';
import BlockHeader from '../BlockHeader/BlockHeader';
import Stroke from '../Stroke/Stroke';

function AboutMe(props) {
  return (
    <div id="aboutMe" className="aboutMe">
     <BlockHeader title="Студент" />
      <div className="aboutMe__container">
        <div className="aboutMe__avatar"></div>
        <h2 className="aboutMe__title">Виталий</h2>
        <p className="aboutMe__subtitle">Фронтенд-разработчик, 30 лет</p>
        <p className="aboutMe__about">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена
и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
        <a className="aboutMe__link" href="/" target="__blank">Github</a>
      </div>
      <div className="aboutMe__portfolio">
        <h3 className="aboutMe__portfolio-title">Портфолио</h3>
        <div className="aboutMe__portfolio-item">
          <a className="aboutMe__portfolio-link" href="/" target="__blank">Статичный сайт</a>
          <a className="aboutMe__portfolio-link aboutMe__portfolio-link_img" href="/" target="__blank"><img src={portfolioItem} alt="Открыть ссылку"/></a>
        </div>
        <Stroke additional="stroke_aboutMe" />
        <div className="aboutMe__portfolio-item">
          <a className="aboutMe__portfolio-link" href="/" target="__blank">Адаптивный сайт</a>
          <a className="aboutMe__portfolio-link_img" href="/" target="__blank"><img src={portfolioItem} alt="Открыть ссылку"/></a>
        </div>
        <Stroke additional="stroke_aboutMe" />
        <div className="aboutMe__portfolio-item">
          <a className="aboutMe__portfolio-link" href="/" target="__blank">Одностраничное приложение</a>
          <a className="aboutMe__portfolio-link aboutMe__portfolio-link_img" href="/" target="__blank"><img src={portfolioItem} alt="Открыть ссылку"/></a>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;