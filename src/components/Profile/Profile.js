import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Stroke from '../Stroke/Stroke';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/MainApi';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import infoOk from '../../images/info_ok.svg';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Profile(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen]  = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorVisible, setErrorVisible] = React.useState(false);
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

  function handleSignOut(){
    props.onSignOut();
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
    setErrorVisible(false);
    return mainApi.setNewUserInfo(values)
    .then((data) => {
      props.setCurrentUser(data);
      closeAllPopups();
      props.openInfo({
        text: 'Данные успешно изменены!',
        path: 'profile',
        img: infoOk
      });
      return data
    })
    .catch((err) => {
      setErrorMessage('Данный Email принадлежит другому пользователю!');
      setErrorVisible(true);
      console.log(err);
      return
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
          <button className="profile__button profile__button_logout" onClick={handleSignOut}>Выйти из аккаунта</button>
        </div>
      </section>
      <InfoTooltip
              isDone={props.isDone}
              handleCloseInfo={props.handleCloseInfo}
              history={props.history}
              pushPath={props.pushPath}
              img={props.img}
              text={props.text}
            />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} errorMessage={errorMessage} errorVisible={errorVisible} />
    </main>
    </>
  );
}

export default Profile;