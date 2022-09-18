import React from 'react';
import portfolioItem from '../../images/aboutMe__portfolio-item.svg';
import BlockHeader from '../BlockHeader/BlockHeader';
import Stroke from '../Stroke/Stroke';

function AboutMe() {
  return (
    <section id="aboutMe" className="aboutMe">
     <BlockHeader title="Студент" />
      <div className="aboutMe__container">
        <div className="aboutMe__avatar"></div>
        <h2 className="aboutMe__title">Максим</h2>
        <p className="aboutMe__subtitle">Фронтенд-разработчик, 25 лет</p>
        <p className="aboutMe__about">Я&nbsp;родился в&nbsp;Таганроге, а&nbsp;сейчас живу в&nbsp;Москве. Люблю слушать музыку и&nbsp;котиков. Начал кодить ещё в&nbsp;14&nbsp;лет, но&nbsp;профессионально решил этим заниматься год назад. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>
        <a className="aboutMe__link" href="https://github.com/MaksimYakushenkov" target="__blank">Github</a>
      </div>
      <div className="aboutMe__portfolio">
        <h3 className="aboutMe__portfolio-title">Портфолио</h3>
        <ul className="aboutMe__portfolio-list">
          <li className="aboutMe__portfolio-item">
            <a className="aboutMe__portfolio-link" href="https://maksimyakushenkov.github.io/how-to-learn/" target="__blank">Статичный сайт <span className="aboutMe__portfolio-link_img"><img src={portfolioItem} alt="Открыть ссылку"/></span></a>
          </li>
          <Stroke additional="stroke_aboutMe" />
          <li className="aboutMe__portfolio-item">
            <a className="aboutMe__portfolio-link" href="https://maksimyakushenkov.github.io/russian-travel/" target="__blank">Адаптивный сайт <span className="aboutMe__portfolio-link_img"><img src={portfolioItem} alt="Открыть ссылку"/></span></a>
          </li>
          <Stroke additional="stroke_aboutMe" />
          <li className="aboutMe__portfolio-item">
            <a className="aboutMe__portfolio-link" href="https://thebestfront.nomoredomains.sbs/" target="__blank">Одностраничное приложение<span className="aboutMe__portfolio-link_img"><img src={portfolioItem} alt="Открыть ссылку"/></span></a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutMe;