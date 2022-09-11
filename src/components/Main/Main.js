import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
    <Header>
      <Navigation place="aboutProject" />
    </Header>
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
    <Footer />
    </>
  );
}

export default Main;