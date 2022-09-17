import React from 'react';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn]  = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoData, setInfoData] = React.useState({
    path: "",
    img: "",
    text: ""
  });
  const history = useHistory();
  const [isDone, setIsDone] = React.useState(false);
  const [innerWidth, setInnerWidth] = React.useState(window.innerWidth);
  const [cardsData, setCardsData] = React.useState(JSON.parse(localStorage.getItem('cardsData')) || []);

  const searchQuery= JSON.parse(localStorage.getItem('searchQuery')) || '';
  const [isUserSearched, setIsUserSearched] = React.useState(JSON.parse(localStorage.getItem('isUserSearched')) || false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [searchMessage, setSearchMessage] = React.useState('Ничего не найдено');
  const [isMovesMore, setIsMovesMore] = React.useState(JSON.parse(localStorage.getItem('isMovesMore')) || false);
  const [numStep, setNumStep] = React.useState(JSON.parse(localStorage.getItem('numStep')) || 1);
  const [favouriteMovies, setFavouriteMovies] = React.useState([]);
  const [newCardsData, setNewCardsData] = React.useState([]);

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
    getFavouriteMovies();
    tokenCheck();
  }, []);



  React.useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [innerWidth]);

  React.useEffect(() => {
    setStepDevice()
    setMoviesList();
  }, [innerWidth, cardsData, numStep]);

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
    .then((data) => {
      return data
    })
    .catch(err => console.log(err));
  }

  function handleSubmitLogin(email, password) {
    return  mainApi.authorize(password, email)
    .then((data) => {
      return data
    })
    .catch(err => console.log(err));
  }



  function getFavouriteMovies() {
    mainApi.getMovies()
    .then((movies) => {
      setFavouriteMovies(movies.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function onMovieLike(movie) {
    const isLiked = favouriteMovies.length === 0 ? false : favouriteMovies.some(i => i.movieId === movie.id);
    if(!isLiked) {
      mainApi.createMovie(movie)
      .then((res) => {
      getFavouriteMovies();
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      mainApi.deleteMovie(favouriteMovies.find(i => i.movieId === movie.id))
      .then((res) => {
        getFavouriteMovies();
      })
      .catch((err) => {
        console.log(err);
      });
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

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt){
      mainApi.getContent(jwt)
      .then((res) => {
        if (res){
          setLoggedIn();
          setCurrentUser(res);
          history.push(history.location.pathname);
        }
      })
      .catch((err) => {
        console.log(err);
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
            cardsData={cardsData}
            setCardsData={setCardsData}
            handleMovieLike={onMovieLike}
            onSubmit={onSubmit}
            searchQuery={searchQuery}
            isUserSearched={isUserSearched}
            isSearching={isSearching}
            searchMessage={searchMessage}
            isMovesMore={isMovesMore}
            numStep={numStep}
            setNumStep={setNumStep}
            setIsMovesMore={setIsMovesMore}
            favouriteMovies={favouriteMovies}
            setStepDevice={setStepDevice}
            getMoreMovies={getMoreMovies}
            setMoviesList={setMoviesList}
            newCardsData={newCardsData}
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
            onSubmit={onSubmit}
            searchQuery={searchQuery}
            isUserSearched={isUserSearched}
            isSearching={isSearching}
            searchMessage={searchMessage}
            isMovesMore={isMovesMore}
            numStep={numStep}
            setNumStep={setNumStep}
            setIsMovesMore={setIsMovesMore}
            favouriteMovies={favouriteMovies}
            setStepDevice={setStepDevice}
            getMoreMovies={getMoreMovies}
            setMoviesList={setMoviesList}
            newCardsData={newCardsData}
          />
          <ProtectedRoute
            path="/profile"
            isLoggedIn={isLoggedIn}
            component={Profile}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            history={history}
            handleLogout={setLoggedOut}
          />
          <Route path="/signup">
            <Register handleSubmitRegister={handleSubmitRegister} openInfo={openInfo} />
            <InfoTooltip
              isDone={isDone}
              handleCloseInfo={handleCloseInfo}
              history={history}
              path={infoData.path}
              img={infoData.img}
              text={infoData.text}
            />
          </Route>
          <Route path="/signin">
            <Login handleLogin={setLoggedIn}  handleSubmitLogin={handleSubmitLogin} history={history} />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
