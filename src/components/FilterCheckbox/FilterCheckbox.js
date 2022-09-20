import React from 'react';

function FilterCheckbox(props) {

  function checkBoxClick () {
    props.handeClickCheckbox();
  }

  return (
    <div className="filterCheckbox" onClick={checkBoxClick}>
      <div className={`filterCheckbox__button ${props.isCheckboxChecked ? 'filterCheckbox__button_active' : ''}`}>
        <div className="filterCheckbox__button-cursor"></div>
      </div>
      <p className="filterCheckbox__title">
        {props.title}
      </p>
    </div>
  );
}

export default FilterCheckbox;