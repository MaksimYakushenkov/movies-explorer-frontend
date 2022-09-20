import React from 'react';
import searchButton from '../../images/searchForm__button.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import Stroke from '../Stroke/Stroke';

function SearchForm(props) {
  const [formValid, setFormValid] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchSavedMovieQuery, setSearchSavedMovieQuery] = React.useState('');

  React.useEffect(() => {
    if (props.place === "savedMovies") {
      setSearchQuery('');
    } else {
      setSearchQuery(JSON.parse(localStorage.getItem("searchQuery")) || '');
    }
  }, [])

  function handeClickCheckbox() {
    props.setIsCheckboxChecked(!props.isCheckboxChecked);
  }

  function handleMovieChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSavedMovieChange(e) {
    setSearchSavedMovieQuery(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    if (props.place === "savedMovies") {
      if (searchSavedMovieQuery.length > 0) {
        props.onSavedMovieSearchSubmit(searchSavedMovieQuery, props.isCheckboxChecked);
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    } else {
      if (searchQuery.length > 0) {
        props.onMovieSearchSubmit(searchQuery, props.isCheckboxChecked);
        setFormValid(true);
      } else {
        setFormValid(false);
      }
    }
  }

  return (
    <section className="searchForm">
      <div className="searchForm__container">
      <form className="searchForm__form" onSubmit={handleSubmit} noValidate>
        <input id="movie" className="searchForm__input" required name="movie" type="text" placeholder="Фильм" value={props.place === "savedMovies" ? searchSavedMovieQuery : searchQuery} onChange={props.place === "savedMovies" ? handleSavedMovieChange : handleMovieChange} disabled={props.isInputBlocked}/>
        <button type="submit" className="searchForm__button"><img src={searchButton} alt="Искать" className="searchForm__button-img"/></button>
      </form>
      <Stroke data="stroke_vertical" additional="stroke_searchForm" />
      <FilterCheckbox
      title="Короткометражки"
      isCheckboxChecked={props.isCheckboxChecked}
      handeClickCheckbox={handeClickCheckbox}
      place={props.place}
      />
      </div>
      <span className={`searchForm__error ${formValid ? ''  :'searchForm__error_visible'}`}>Нужно ввести ключевое слово</span>
      <Stroke additional="stroke_searchForm-footer" />
    </section>
  );
}

export default SearchForm;