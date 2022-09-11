import React from "react";

function MoviesCard(props) {

  return (
    <article className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__header-container">
          <h1 className="moviesCard__title">{props.title}</h1>
          <p className="moviesCard__duration">{Math.floor((props.duration / (1000 * 60 * 60)) % 24)}ч {(Math.floor((props.duration / (1000 * 60)) % 60))}м</p>
        </div>
        <div className={`moviesCard__favorite ${props.isFavorite && 'moviesCard__favorite_active'} ${props.place === "savedMovies" && 'moviesCard__favorite_trash'}`}></div>
      </div>
      <img className="moviesCard__thumbnail" src={props.thumbnail} alt={props.title}/>
    </article>
  );
}

export default MoviesCard;