import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import validation from '../Validation/Validation';

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [nameValid, setNameValid] = React.useState(false);
  const [emailValid, setEmailValid] = React.useState(false);
  const [formValid, setFormValid] = React.useState(false);

 const inputRef = React.useRef(null);


  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser, props.isOpen]);

  React.useEffect(() => {
    setFormValid(nameValid || emailValid);
  }, [nameValid, emailValid]);

  function handleNameChange(e) {
    setName(e.target.value);
    if (currentUser.name !== e.target.value) {
      setNameValid(validation.validateInput(e.target));
    } else {
      setNameValid(false);
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (currentUser.email !== e.target.value) {
      setEmailValid(validation.validateInput(e.target));
    } else {
      setEmailValid(false);
    }
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Блокируем поля формы во время выполнения запроса
    props.setIsInputBlocked(true);

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      email,
    })
    .then((data) => {
      if(data) {
        setNameValid(false);
        setEmailValid(false);
        props.setIsInputBlocked(false);
      }
    });
  }

  return (
    <PopupWithForm
      popupName="profile-popup"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
         <div className="register__field">
            <label className="register__label" htmlFor="name">Имя</label>
            <input id="name" ref={inputRef} className="register__input" required name="name"
            type="text" placeholder="Имя" value={name || ''} onChange={handleNameChange}
            disabled={props.isInputBlocked} />
            <span className="name-error error-message"></span>
          </div>

          <div className="register__field">
            <label className="register__label" htmlFor="email">E-mail</label>
            <input id="email" ref={inputRef} className="register__input register__input_email" required name="email" type="email"  placeholder="Email" value={email || ''}  onChange={handleEmailChange} disabled={props.isInputBlocked} />
            <span className="email-error error-message"></span>
          </div>
          <span className={`error-message ${props.errorVisible ? 'error_visible' : ''}`}>{props.errorMessage}</span>
          <button type="submit" className={`popup__submit-button ${!formValid && 'popup__submit-button_disabled'}`} disabled={!formValid}>Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
