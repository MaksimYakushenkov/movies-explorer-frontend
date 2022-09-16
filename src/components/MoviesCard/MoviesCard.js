import React from "react";

function MoviesCard(props) {

  return (
    <article className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__header-container">
          <h1 className="moviesCard__title">{props.nameRU}</h1>
          <p className="moviesCard__duration">{Math.floor((props.duration / 60)) > 0 && `${Math.floor((props.duration / 60))}ч`} {(props.duration - Math.floor((props.duration / 60))*60)}м</p>
        </div>
        <button className={`moviesCard__favourite ${props.isFavorite && 'moviesCard__favourite_active'} ${props.place === "savedMovies" && 'moviesCard__favourite_trash'}`}></button>
      </div>
      <img className="moviesCard__thumbnail" src={`https://api.nomoreparties.co${props.image.url}`} alt={props.nameRU}/>
    </article>
  );
}

export default MoviesCard;