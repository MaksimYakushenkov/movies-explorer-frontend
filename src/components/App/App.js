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


  React.useEffect(() => {
    window.addEventListener('resize', detectSize);

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [innerWidth]);

  React.useEffect(() => {
    tokenCheck();
  }, []);

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
          />
          <ProtectedRoute
            exact path="/saved-movies"
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            currentUser={currentUser}
          />
          <ProtectedRoute
            exact path="/profile"
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
