import React from 'react';
import BlockHeader from '../BlockHeader/BlockHeader';

function Techs(props) {
  return (
    <div id="techs" className="techs">
      <BlockHeader title="Технологии" />
      <div className="techs__container">
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__links-container">
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">HTML</a>
          </div>
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">CSS</a>
          </div>
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">JS</a>
          </div>
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">React</a>
          </div>
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">Git</a>
          </div>
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">Express.js</a>
          </div>
          <div className="techs__link-container">
          <a className="techs__link" href="/" target="__blank">mongoDB</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Techs;