import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviesError from '../MoviesError/MoviesError';
import mainApi from '../../utils/MainApi';
import infoError from '../../images/info_error.svg';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function SavedMovies(props) {
  const [savedMoviesData, setSavedMoviesData] = React.useState(props.favouriteMovies || []);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  React.useEffect(() => {
    setSavedMoviesData(props.favouriteMovies);
  }, [props.favouriteMovies]);

  function onSavedMovieSearchSubmit(data, isCheckboxChecked) {
    const moviesData = props.favouriteMovies.filter(movie => (isCheckboxChecked ? movie.nameRU.toLowerCase().includes(data.toLowerCase()) && movie.duration <= 40 : movie.nameRU.toLowerCase().includes(data.toLowerCase())));
    setSavedMoviesData(moviesData);
  }

  function onMovieDeleteLike(movie) {
    const isLiked = props.favouriteMovies.length === 0 ? false : props.favouriteMovies.some(i => i.movieId === movie.movieId);
    if(isLiked) {
      mainApi.deleteMovie(props.favouriteMovies.find(i => i.movieId === movie.movieId))
      .then((res) => {
        setSavedMoviesData((cards) => {
        return props.favouriteMovies.filter(item => {return item.movieId !== movie.movieId})
      })})
      .catch((err) => {
        console.log(err);
        props.openInfo({
          text: 'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз',
          path: '/saved-movies',
          img: infoError
        });
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
        onSavedMovieSearchSubmit={onSavedMovieSearchSubmit}
        isCheckboxChecked={isCheckboxChecked}
        setIsCheckboxChecked={setIsCheckboxChecked}
        isInputBlocked={props.isInputBlocked}
        setIsInputBlocked={props.setIsInputBlocked}
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
        <MoviesError searchMessage={"Вы еще не добавили ни одного фильма."} />
        }
      </main>
      <InfoTooltip
        isDone={props.isDone}
        handleCloseInfo={props.handleCloseInfo}
        history={props.history}
        pushPath={props.pushPath}
        img={props.img}
        text={props.text}
      />
    <Footer />
    </>
  );
}

export default SavedMovies;