import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesContainer(props) {

  return (
    <section className="moviesContainer">
    {props.cardsData.map((movie) => (<MoviesCard key={movie.id} {...movie} />))}
  </section>
  );
}

export default MoviesContainer;