import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviesError from '../MoviesError/MoviesError';
import mainApi from '../../utils/MainApi';
function SavedMovies(props) {
  const [savedMoviesData, setSavedMoviesData] = React.useState(props.favouriteMovies || []);

  React.useEffect(() => {
    setSavedMoviesData(props.favouriteMovies);
  }, [props.favouriteMovies]);

  function onSubmit(data, isCheckboxChecked) {
    const moviesData = props.favouriteMovies.filter(movie => (isCheckboxChecked ? movie.nameRU.toLowerCase().includes(data.toLowerCase()) && movie.duration <= 40 : movie.nameRU.toLowerCase().includes(data.toLowerCase())));
    localStorage.setItem('isUserSearched', JSON.stringify(true));
    localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));
    setSavedMoviesData(moviesData);
  }

  function onMovieDeleteLike(movie) {
    const isLiked = props.favouriteMovies.length === 0 ? false : props.favouriteMovies.some(i => i.movieId === movie.movieId);
    if(isLiked) {
      mainApi.deleteMovie(props.favouriteMovies.find(i => i.movieId === movie.movieId))
      .then((res) => {
        props.getFavouriteMovies();
        setSavedMoviesData((cards) => {
        return props.favouriteMovies.filter(item => {return item.movieId !== movie.movieId})
      })})
      .catch((err) => {
        console.log(err);
      });
    }
  }

  return (
    <>
    <Header>
      <Navigation place="savedMovies" />
    </Header>
        <main className="savedMovies">
        <SearchForm
        onSubmit={onSubmit}
        place="savedMovies"
        />
        { props.isSearching ?
        <Preloader />
        :
        savedMoviesData.length > 0 ?
        <MoviesContainer
          place="savedMovies"
          cardsData={savedMoviesData}
          handleMovieLike={onMovieDeleteLike}
          favouriteMovies={props.favouriteMovies}
        />
        :
        props.isUserSearched && <MoviesError searchMessage={props.searchMessage} />
        }
      </main>
    <Footer />
    </>
  );
}

export default SavedMovies;