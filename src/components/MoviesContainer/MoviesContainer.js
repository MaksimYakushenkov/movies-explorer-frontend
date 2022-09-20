import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesContainer(props) {

  return (
    <section className="moviesContainer">
    {props.cardsData.map((movie) => (<MoviesCard key={props.place !== "savedMovies" ? movie.id : movie.movieId} {...movie} handleMovieLike={props.handleMovieLike} place={props.place} favouriteMovies={props.favouriteMovies} />))}
  </section>
  );
}

export default MoviesContainer;