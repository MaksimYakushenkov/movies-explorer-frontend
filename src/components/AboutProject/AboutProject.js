import React from 'react';
import BlockHeader from '../BlockHeader/BlockHeader';

function AboutProject() {
  return (
    <section id="aboutProject" className="aboutProject">
      <BlockHeader title="О проекте" />
      <div className="aboutProject__grid">
        <p className="aboutProject__grid-title">Дипломный проект включал 5 этапов</p>
        <p className="aboutProject__grid-title">На выполнение диплома ушло 5 недель</p>
        <p className="aboutProject__grid-about">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="aboutProject__grid-about">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="aboutProject__grid-progress">
        <p className="aboutProject__grid-progress_title aboutProject__grid-progress_green">1 неделя</p>
        <p className="aboutProject__grid-progress_title aboutProject__grid-progress_brown">4 недели</p>
        <p className="aboutProject__grid-progress_about">Back-end</p>
        <p className="aboutProject__grid-progress_about">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;