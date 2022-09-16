import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviesError from '../MoviesError/MoviesError';

function Movies(props) {
  const [cardsData, setCardsData] = React.useState(JSON.parse(localStorage.getItem('cardsData')) || []);
  const [isUserSearched, setIsUserSearched] = React.useState(JSON.parse(localStorage.getItem('isUserSearched')) || false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('Ничего не найдено');
  const searchQuery= JSON.parse(localStorage.getItem('searchQuery')) || '';
  const [newCardsData, setNewCardsData] = React.useState([]);
  const [isMovesMore, setIsMovesMore] = React.useState(JSON.parse(localStorage.getItem('isMovesMore')) || false);
  const [isMaximumMoveView, setIsMaximumMoveView] = React.useState();
  const innerWidth = props.innerWidth;
  const [numCardsView, setNumCardsView] = React.useState(JSON.parse(localStorage.getItem('numCardsView')) || 0);

  const [numStep, setNumStep] = React.useState(JSON.parse(localStorage.getItem('numStep')) || 1);
  const [stepValue, setStepValue] = React.useState(() => {
    if(innerWidth >= 1280) {
      return 3
    } else if (innerWidth >= 481 && innerWidth <= 1279) {
      return 2
    } else if (innerWidth >= 320 && innerWidth <= 480) {
      return 2
    }
  });


  React.useEffect(() => {
    setStepDevice()
    setMoviesList();
  }, [innerWidth, cardsData, numStep])

  function setStepDevice() {
    if(innerWidth >= 1280) {
      setStepValue(3)
    } else if (innerWidth >= 481 && innerWidth <= 1279) {
      setStepValue(2)
    } else if (innerWidth >= 320 && innerWidth <= 480) {
      setStepValue(2)
    }
  }

  function getMoreMovies() {
    setNumStep(numStep + 1)
    localStorage.setItem('numStep', JSON.stringify(numStep + 1));
    if ((numStep+1)*stepValue >= cardsData.length) {
      setIsMovesMore(false);
      localStorage.setItem('isMovesMore', JSON.stringify(false));
    } else {
      localStorage.setItem('isMovesMore', JSON.stringify(true));
    }
  }

  //Фукнция вывода фильмов взависимости от размера экрана
  function setMoviesList() {
    if(innerWidth >= 1280) {
      return setNewCardsData(cardsData.slice(0, numStep*stepValue <= 12 ? numStep*stepValue : 12));

    } else if (innerWidth >= 481 && innerWidth <= 1279) {

      return setNewCardsData(cardsData.slice(0, numStep*stepValue <= 8 ? numStep*stepValue : 8));
    } else if (innerWidth >= 320 && innerWidth <= 480) {

      return setNewCardsData(cardsData.slice(0, numStep*stepValue <= 5 ? numStep*stepValue : 5));
    }
  }



  function onSubmit(data, isCheckboxChecked) {
    setIsSearching(true);
    setCardsData([]);
    moviesApi.getInitialFilms()
    .then(movies => {
      setIsSearching(false);
      setNumStep(1);
      setIsMovesMore(true);
      localStorage.setItem('isMovesMore', JSON.stringify(true));
      const moviesData = movies.filter(movie => (isCheckboxChecked ? movie.nameRU.toLowerCase().includes(data.toLowerCase()) && movie.duration <= 60 : movie.nameRU.toLowerCase().includes(data.toLowerCase())));
      localStorage.setItem('isUserSearched', JSON.stringify(true));
      localStorage.setItem('cardsData', JSON.stringify(moviesData.slice(0,12)));
      localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));
      setCardsData(moviesData.slice(0,12));
      setIsUserSearched(true);
    })
    .catch((err) => {
      setIsSearching(false);
      setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      console.log(err);
    });
  }

  return (
    <>
    <Header>
      <Navigation place="movies" />
    </Header>
        <main className="movies">
        <SearchForm
        onSubmit={onSubmit}
        searchQuery={searchQuery}
        />
        { isSearching ?
        <Preloader />
        :
        cardsData.length > 0 ?
        <MoviesContainer
          cardsData={newCardsData}
        />
        :
        isUserSearched && <MoviesError searchMessage={searchMessage} />
        }
        <div className={`movies__more ${isMovesMore && 'movies__more_visible'}`}>
          <button className="movies__more-button" onClick={getMoreMovies}>Ещё</button>
        </div>
      </main>
    <Footer />
    </>
  );
}

export default Movies;