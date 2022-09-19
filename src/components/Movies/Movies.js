import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviesError from '../MoviesError/MoviesError';

function Movies(props) {
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(JSON.parse(localStorage.getItem("isCheckboxChecked")) || false);

  return (
    <>
    <Header>
      <Navigation place="movies" />
    </Header>
        <main className="movies">
        <SearchForm
        onMovieSearchSubmit={props.onMovieSearchSubmit}
        searchQuery={props.searchQuery}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        isInputBlocked={props.isInputBlocked}
        setIsInputBlocked={props.setIsInputBlocked}
        place="movies"
        />
        { props.isSearching ?
        <Preloader />
        :
        props.isServerError ?
        <MoviesError searchMessage={props.searchMessage} />
        :
        props.newCardsData.length > 0 ?
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