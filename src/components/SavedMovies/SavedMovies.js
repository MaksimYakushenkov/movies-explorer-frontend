import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import {cardsData} from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';

function SavedMovies() {

  return (
    <div className="savedMovies">
      <Header>
        <Navigation place="savedMovies" />
      </Header>
      <SearchForm />
      <div className="moviesContainer">
        {cardsData.map((movie) => movie.isFavorite ? ( <MoviesCard key={movie.id} place="savedMovies" {...movie}/>) : '')}
      </div>
      <div className="savedMovies__devider"></div>
      <Footer />
    </div>
  );
}

export default SavedMovies;