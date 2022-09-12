import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import {cardsData} from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';

function SavedMovies() {

  return (
    <>
    <Header>
      <Navigation place="savedMovies" />
    </Header>
    <main className="savedMovies">
      <SearchForm />
      <section className="moviesContainer">
        {cardsData.map((movie) => movie.isFavorite ? ( <MoviesCard key={movie.id} place="savedMovies" {...movie}/>) : '')}
      </section>
      <div className="savedMovies__devider"></div>
    </main>
    <Footer />
    </>
  );
}

export default SavedMovies;