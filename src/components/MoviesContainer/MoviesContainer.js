import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import mainApi from "../../utils/MainApi";
function MoviesContainer(props) {


  return (
    <section className="moviesContainer">
    {props.cardsData.map((movie) => (<MoviesCard key={movie.id} {...movie} handleMovieLike={props.handleMovieLike} place={props.place} favouriteMovies={props.favouriteMovies} />))}
  </section>
  );
}

export default MoviesContainer;