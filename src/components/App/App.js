import React from 'react';
import { Route, Switch, withRouter, useHistory } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import mainApi from '../../utils/MainApi';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';
import infoError from '../../images/info_error.svg';

function App() {
  const [isLoggedIn, setIsLoggedIn]  = React.useState(localStorage.getItem('isLoggedIn'));
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoData, setInfoData] = React.useState({
    path: "",
    img: "",
    text: ""
  });
  const history = useHistory();
  const [isDone, setIsDone] = React.useState(false);
  const [isInputBlocked, setIsInputBlocked] = React.useState(false);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  const [cardsData, setCardsData] = React.useState([]);
  const [isServerError, setIsServerError] = React.useState(false);
  const searchQuery = JSON.parse(localStorage.getItem('searchQuery')) || '';
  const [isUserSearched, setIsUserSearched] = React.useState(JSON.parse(localStorage.getItem('isUserSearched')) || false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('Ничего не найдено');
  const [isMovesMore, setIsMovesMore] = React.useState(JSON.parse(localStorage.getItem('isMovesMore')) || false);
  const [numStep, setNumStep] = React.useState(JSON.parse(localStorage.getItem('numStep')) || 0);
  const [favouriteMovies, setFavouriteMovies] = React.useState([]);
  const [newCardsData, setNewCardsData] = React.useState(JSON.parse(localStorage.getItem('newCardsData')) || []);
  const [newnewCardsData, setNewnewCardsData] = React.useState([]);
  const [stepValue, setStepValue] = React.useState(() => {
    if(innerWidth >= 1280) {
      return 12
    } else if (innerWidth >= 481 && innerWidth <= 1279) {
      return 8
    } else if (innerWidth >= 320 && innerWidth <= 480) {
      return 5
    }
  });
  const [device, setDevice] = React.useState(() => {
    if(innerWidth >= 1280) {
      return 3
    } else if (innerWidth >= 481 && innerWidth <= 1279) {
      return 2
    } else if (innerWidth >= 320 && innerWidth <= 480) {
      return 2
    }
  })

  function onSignOut(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('cardsData');
    localStorage.removeItem('isMovesMore');
    localStorage.removeItem('isUserSearched');
    localStorage.removeItem('isCheckboxChecked');
    localStorage.removeItem('newCardsData');
    setIsLoggedIn(false);
    setFavouriteMovies([]);
    setNewnewCardsData([]);
    history.push('/');
  }

  React.useEffect(() => {
    getInitialFilms();
    tokenCheck();
  }, []);

  React.useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [innerWidth]);

  React.useEffect(() => {
    setValueDevice();
    setStep();
    setNewnewCardsData(setMoviesList);
    setIsMovesMore(numStep*device + stepValue < newCardsData.length)
  }, [innerWidth, numStep, newCardsData]);

  function detectSize() {
    setInnerWidth(window.innerWidth);
  }

  function handleCloseInfo() {
    setIsDone(false);
  }

  function setLoggedIn() {
    setIsLoggedIn(true);
  }

  function setLoggedOut() {
    setIsLoggedIn(false);
  }

  function getInitialFilms() {
    moviesApi.getInitialFilms()
    .then(movies => {
      setCardsData(movies);
    })
    .catch((err) => {
      setIsServerError(true);
      setSearchMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      console.log(err);
    });
  }

  function openInfo(data) {
    setInfoData({
      path: data.path,
      img: data.img,
      text: data.text
    });
    setIsDone(true);
  }

  function handleSubmitRegister(name, email, password) {
    return  mainApi.register(name, password, email)
    .then(() => {
      handleSubmitLogin(email, password)
      .then((data) => {
        setIsDone(false);
        setLoggedIn();
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('jwt', data.token);
        history.push('/movies');
        return data
      })
      .catch((err) => {
        console.log(err);
        openInfo({
          text: `${err}. Подождите немного и попробуйте ещё раз`,
          path: history.location.pathname,
          img: infoError
        });
      });
    })
    .catch((err) => {
      console.log(err);
      if (err === 'Ошибка: 409') {
        return 'emailIsBusy'
      }
      if (err === 'Ошибка: 400') {
        return 'invalidEmail'
      }
    });
  }

  function handleSubmitLogin(email, password) {
    return  mainApi.authorize(password, email)
    .then((data) => {
      return data
    })
    .catch((err) => {
      console.log(err);
      openInfo({
        text: `${err}. Подождите немного и попробуйте ещё раз`,
        path: history.location.pathname,
        img: infoError
      });
    });
  }

  function getFavouriteMovies() {
    mainApi.getMovies()
    .then((movies) => {
      setFavouriteMovies(movies.data);
    })
    .catch((err) => {
      console.log(err);
      openInfo({
        text: `${err}. Подождите немного и попробуйте ещё раз`,
        path: history.location.pathname,
        img: infoError
      });
    });
  }

  function onMovieLike(movie) {
    const isLiked = favouriteMovies.length === 0 ? false : favouriteMovies.some(i => i.movieId === movie.id);
    if(!isLiked) {
      mainApi.createMovie(movie)
      .then((res) => {
        setFavouriteMovies(favouriteMovies.concat(res.data));
      })
      .catch((err) => {
        console.log(err);
        openInfo({
          text: `${err}. Подождите немного и попробуйте ещё раз`,
          path: history.location.pathname,
          img: infoError
        });
      });
    } else {
      mainApi.deleteMovie(favouriteMovies.find(i => i.movieId === movie.id))
      .then(() => {
        setFavouriteMovies((cards) => {
        return favouriteMovies.filter(item => {return item.movieId !== movie.id})
      })})
      .catch((err) => {
        console.log(err);
        openInfo({
          text: `${err}. Подождите немного и попробуйте ещё раз`,
          path: history.location.pathname,
          img: infoError
        });
      });
    }
  }

  function onMovieSearchSubmit(data, isCheckboxChecked) {
    localStorage.setItem("searchQuery", JSON.stringify(data));
    setIsSearching(true);
    setIsUserSearched(true);
    setIsSearching(false);
    setNumStep(0);
    localStorage.removeItem('numStep');
    localStorage.setItem('isCheckboxChecked', JSON.stringify(isCheckboxChecked));
    localStorage.setItem('isUserSearched', JSON.stringify(true));
    const moviesData = cardsData.filter(movie => (isCheckboxChecked ? movie.nameRU.toLowerCase().includes(data.toLowerCase()) && movie.duration <= 40 : movie.nameRU.toLowerCase().includes(data.toLowerCase())));
    setNewCardsData(moviesData);
    setSearchMessage('Ничего не найдено');
    localStorage.setItem('newCardsData', JSON.stringify(moviesData));
  }

  function setValueDevice() {
    if(innerWidth >= 1280) {
      setDevice(3);
    } else if (innerWidth >= 481 && innerWidth <= 1279) {
      setDevice(2);
    } else if (innerWidth >= 320 && innerWidth <= 480) {
      setDevice(2);
    }
  }

  function getMoreMovies() {
    setNumStep(v => v + 1);
    localStorage.setItem('numStep', JSON.stringify(numStep + 1));
  }

  function setStep() {
    if(innerWidth >= 1280) {
      setStepValue(12);
    } else if (innerWidth >= 481 && innerWidth <= 1279) {
      setStepValue(8);

    } else if (innerWidth >= 320 && innerWidth <= 480) {
      setStepValue(5);
    }
  }

  //Фукнция вывода фильмов взависимости от размера экрана
  function setMoviesList() {
    return newCardsData.slice(0, (stepValue + numStep*device));
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
    mainApi.getContent(jwt)
    .then((res) => {
      if (res){
        setLoggedIn();
        setCurrentUser(res);
        getFavouriteMovies();
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        history.push(history.location.pathname);
      }
    })
    .catch((err) => {
      console.log(err);
      openInfo({
        text: `${err}. Подождите немного и попробуйте ещё раз`,
        path: history.location.pathname,
        img: infoError
      });
    });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">

        <Switch>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn}/>
          </Route>
          <ProtectedRoute
            path="/movies"
            isLoggedIn={isLoggedIn}
            component={Movies}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            history={history}
            tokenCheck={tokenCheck}
            innerWidth={innerWidth}
            setCardsData={setCardsData}
            handleMovieLike={onMovieLike}
            onMovieSearchSubmit={onMovieSearchSubmit}
            searchQuery={searchQuery}
            isUserSearched={isUserSearched}
            isSearching={isSearching}
            searchMessage={searchMessage}
            isMovesMore={isMovesMore}
            numStep={numStep}
            setNumStep={setNumStep}
            setIsMovesMore={setIsMovesMore}
            favouriteMovies={favouriteMovies}
            getMoreMovies={getMoreMovies}
            setMoviesList={setMoviesList}
            newCardsData={newnewCardsData}
            isServerError={isServerError}
            isInputBlocked={isInputBlocked}
            setIsInputBlocked={setIsInputBlocked}
          />
          <ProtectedRoute
            path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            history={history}
            tokenCheck={tokenCheck}
            innerWidth={innerWidth}
            cardsData={cardsData}
            setCardsData={setCardsData}
            handleMovieLike={onMovieLike}
            onMovieSearchSubmit={onMovieSearchSubmit}
            searchQuery={searchQuery}
            isUserSearched={isUserSearched}
            isSearching={isSearching}
            searchMessage={searchMessage}
            isMovesMore={isMovesMore}
            numStep={numStep}
            setNumStep={setNumStep}
            setIsMovesMore={setIsMovesMore}
            favouriteMovies={favouriteMovies}
            getMoreMovies={getMoreMovies}
            setMoviesList={setMoviesList}
            newCardsData={newCardsData}
            getFavouriteMovies={getFavouriteMovies}
            isServerError={isServerError}
            isDone={isDone}
            handleCloseInfo={handleCloseInfo}
            pushPath={infoData.path}
            img={infoData.img}
            text={infoData.text}
            setInfoData={setInfoData}
            openInfo={openInfo}
            isInputBlocked={isInputBlocked}
            setIsInputBlocked={setIsInputBlocked}
          />
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            history={history}
            handleLogout={setLoggedOut}
            openInfo={openInfo}
            isDone={isDone}
            handleCloseInfo={handleCloseInfo}
            pushPath={infoData.path}
            img={infoData.img}
            text={infoData.text}
            onSignOut={onSignOut}
            isInputBlocked={isInputBlocked}
            setIsInputBlocked={setIsInputBlocked}
          />
          <Route path="/signup">
            <Register isLoggedIn={isLoggedIn}
            handleLogin={setLoggedIn}
            handleSubmitRegister={handleSubmitRegister}
            handleSubmitLogin={handleSubmitLogin}
            openInfo={openInfo}
            isInputBlocked={isInputBlocked}
            setIsInputBlocked={setIsInputBlocked}
            />
            <InfoTooltip
              isDone={isDone}
              handleCloseInfo={handleCloseInfo}
              history={history}
              pushPath={infoData.path}
              img={infoData.img}
              text={infoData.text}

            />
          </Route>
          <Route path="/signin">
            <Login isLoggedIn={isLoggedIn}
            handleLogin={setLoggedIn}
            handleSubmitLogin={handleSubmitLogin}
            history={history}
            isInputBlocked={isInputBlocked}
            setIsInputBlocked={setIsInputBlocked}
          />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isDone={isDone}
          handleCloseInfo={handleCloseInfo}
          history={history}
          pushPath={infoData.path}
          img={infoData.img}
          text={infoData.text}
        />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
