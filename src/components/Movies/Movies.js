import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import {cardsData} from '../../utils/constants';

function Movies() {
  return (
    <>
    <Header>
      <Navigation place="movies" />
    </Header>
    <main className="movies">
      <SearchForm />
      <section className="moviesContainer">
        {window.innerWidth >= 1280 && cardsData.slice(0, 12).map((movie) => (<MoviesCard key={movie.id} {...movie} />))}
        {window.innerWidth >= 768 && window.innerWidth <= 1279 && cardsData.slice(0, 8).map((movie) => (<MoviesCard key={movie.id} {...movie} />))}
        {window.innerWidth >= 320 && window.innerWidth <= 767 && cardsData.slice(0, 4).map((movie) => (<MoviesCard key={movie.id} {...movie} />))}
      </section>
      <div className="movies__more">
        <button className="movies__more-button">Ещё</button>
      </div>
    </main>
    <Footer />
    </>
  );
}

export default Movies;