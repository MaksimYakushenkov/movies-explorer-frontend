import React from 'react';
import searchButton from '../../images/searchForm__button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Stroke from '../Stroke/Stroke';

function SearchForm(props) {
  const [formValid, setFormValid] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState(JSON.parse(localStorage.getItem("searchQuery")) || '');

  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(() => {
    const isCheckboxChecked = JSON.parse(localStorage.getItem("isCheckboxChecked"));
    return isCheckboxChecked || false
  });

  function handeClickCheckbox() {
    setIsCheckboxChecked(!isCheckboxChecked);
  }

  function handleMovieChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    if (searchQuery.length > 0) {
      localStorage.setItem("searchQuery", JSON.stringify(searchQuery));
      props.onSubmit(searchQuery, isCheckboxChecked);
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }

  return (
    <section className="searchForm">
      <div className="searchForm__container">
      <form className="searchForm__form" onSubmit={handleSubmit} noValidate>
        <input id="movie" className="searchForm__input" required name="movie" type="text" placeholder="Фильм" value={searchQuery} onChange={handleMovieChange}/>
        <button type="submit" className="searchForm__button"><img src={searchButton} alt="Искать" className="searchForm__button-img"/></button>
      </form>
      <Stroke data="stroke_vertical" additional="stroke_searchForm" />
      <FilterCheckbox
      title="Короткометражки"
      isCheckboxChecked={isCheckboxChecked}
      handeClickCheckbox={handeClickCheckbox}
      />
      </div>
      <span className={`searchForm__error ${formValid ? ''  :'searchForm__error_visible'}`}>Нужно ввести ключевое слово</span>
      <Stroke additional="stroke_searchForm-footer" />
    </section>
  );
}

export default SearchForm;