import React from 'react';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">

      <div className="page">
      <Switch>
        <Route exact path="/">
          <Main/>
        </Route>
        <Route path="/movies">
          <Movies/>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>

      </Switch>

      </div>
    </div>
  );
}

export default App;
