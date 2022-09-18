import React from "react";

function MoviesCard(movie) {
  const isLiked = movie.favouriteMovies.length === 0 ? false : movie.favouriteMovies.some
  (i => i.movieId === movie.id);
  function handleMovieLike() {
    movie.handleMovieLike(movie);
  }

  function handleClick(){
    window.open(movie.trailerLink, '_blank');
}
  return (
    <article className="moviesCard">
      <div className="moviesCard__header">
        <div className="moviesCard__header-container">
          <h1 className="moviesCard__title" onClick={handleClick}>{movie.nameRU}</h1>
          <p className="moviesCard__duration">{Math.floor((movie.duration / 60)) > 0 && `${Math.floor((movie.duration / 60))}ч`} {(movie.duration - Math.floor((movie.duration / 60))*60)}м</p>
        </div>
        <button className={`moviesCard__favourite ${isLiked && 'moviesCard__favourite_active'} ${movie.place === "savedMovies" && 'moviesCard__favourite_trash'}`} onClick={handleMovieLike}></button>
      </div>
      <img className="moviesCard__thumbnail" src={movie.place !== "savedMovies" ? `https://api.nomoreparties.co${movie.image.url}` : `${movie.image}`} alt={movie.nameRU} onClick={handleClick} />
    </article>
  );
}

export default MoviesCard;