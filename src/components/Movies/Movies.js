import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviesError from '../MoviesError/MoviesError';

function Movies(props) {

  return (
    <>
    <Header>
      <Navigation place="movies" />
    </Header>
        <main className="movies">
        <SearchForm
        onSubmit={props.onSubmit}
        searchQuery={props.searchQuery}
        />
        { props.isSearching ?
        <Preloader />
        :
        props.cardsData.length > 0 ?
        <MoviesContainer
          place="movies"
          cardsData={props.newCardsData}
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

export default Movies;