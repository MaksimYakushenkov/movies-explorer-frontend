import React from 'react';
import { Route, Switch, Link, withRouter, useHistory } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Stroke from '../Stroke/Stroke';
import { profile } from '../../utils/constants';

function Profile() {
  return (
    <main className="profile">
      <Header>
        <Navigation place="profile" />
      </Header>
      <div className="profile__container">
        <h1 className="profile__title">Привет, {profile.name}</h1>
        <div className="profile__info">
          <div className="profile__info-container">
            <p className="profile__info-title">Имя</p>
            <p className="profile__info-value">{profile.name}</p>
          </div>
          <Stroke additional="stroke_profile" />
          <div className="profile__info-container">
            <p className="profile__info-title">E-mail</p>
            <p className="profile__info-value">{profile.email}</p>
          </div>
        </div>
        <div className="profile__links">
          <a className="profile__link" href="/">Редактировать</a>
          <a className="profile__link profile__link_logout" href="/">Выйти из аккаунта</a>
        </div>
      </div>
    </main>
  );
}

export default Profile;