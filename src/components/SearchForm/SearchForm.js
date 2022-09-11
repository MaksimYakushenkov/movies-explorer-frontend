import React from 'react';
import searchButton from '../../images/searchForm__button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Stroke from '../Stroke/Stroke';

function SearchForm() {
  return (
    <section className="searchForm">
      <div className="searchForm__container">
      <form className="searchForm__form">
          <input id="movie" className="searchForm__input" required name="movie" type="text" placeholder="Фильм"/>
          <button type="submit" className="searchForm__button"><img src={searchButton} alt="Искать" className="searchForm__button-img"/></button>
      </form>
      <Stroke data="stroke_vertical" additional="stroke_searchForm" />
      <FilterCheckbox
      title="Короткометражки"
      />
      </div>
      <Stroke additional="stroke_searchForm-footer" />
    </section>
  );
}

export default SearchForm;