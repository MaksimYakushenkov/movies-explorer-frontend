import React from 'react';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Stroke from '../Stroke/Stroke';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';

function Profile(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]  = React.useState(false);
  const jwt = localStorage.getItem('jwt');
  //Эффект получения инфо о пользователе
  React.useEffect(() => {
    mainApi.getContent(jwt)
    .then(data => {
      props.setCurrentUser(data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, []);

  function signOut(){
    localStorage.removeItem('jwt');
    props.history.push('/');
    props.handleLogout();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  //Функция закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
  }

  //Функция обновления данных о пользователе
  function handleUpdateUser(values) {
    mainApi.setNewUserInfo(values)
    .then(data => {
      props.setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <>
    <Header>
      <Navigation place="profile" />
    </Header>
    <main className="profile">
      <section className="profile__container">
        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <div className="profile__info">
          <div className="profile__info-container">
            <p className="profile__info-title">Имя</p>
            <p className="profile__info-value">{currentUser.name}</p>
          </div>
          <Stroke additional="stroke_profile" />
          <div className="profile__info-container">
            <p className="profile__info-title">E-mail</p>
            <p className="profile__info-value">{currentUser.email}</p>
          </div>
        </div>
        <div className="profile__buttons">
          <button className="profile__button" onClick={handleEditProfileClick}>Редактировать</button>
          <button className="profile__button profile__button_logout" onClick={signOut}>Выйти из аккаунта</button>
        </div>
      </section>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
    </main>
    </>
  );
}

export default Profile;