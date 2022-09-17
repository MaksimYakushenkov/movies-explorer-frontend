import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import {cardsData} from '../../utils/constants';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviesError from '../MoviesError/MoviesError';

function SavedMovies(props) {

  return (
    <>
    <Header>
      <Navigation place="savedMovies" />
    </Header>
        <main className="savedMovies">
        <SearchForm
        onSubmit={props.onSubmit}
        searchQuery={props.searchQuery}
        />
        { props.isSearching ?
        <Preloader />
        :
        props.cardsData.length > 0 ?
        <MoviesContainer
          place="savedMovies"
          cardsData={props.favouriteMovies}
          handleMovieLike={props.handleMovieLike}
          favouriteMovies={props.favouriteMovies}
        />
        :
        props.isUserSearched && <MoviesError searchMessage={props.searchMessage} />
        }
        <div className={`movies__more ${props.isMovesMore && 'movies__more_visible'}`}>
          <button className="movies__more-button" onClick={props.getMoreMovies}>Ещё</button>
        </div>
      </main>
    <Footer />
    </>
  );
}

export default SavedMovies;