import React from 'react';

function FilterCheckbox(props) {
  const [isCheckBoxClicked, setIsCheckBoxClicked]  = React.useState(true);

  function checkBoxClick () {
    setIsCheckBoxClicked(!isCheckBoxClicked);
  }

  return (
    <div className="filterCheckbox">
      <div onClick={checkBoxClick} className={`filterCheckbox__button ${isCheckBoxClicked && 'filterCheckbox__button_active'}`}>
        <div className="filterCheckbox__button-cursor"></div>
      </div>
      <p className="filterCheckbox__title">
        {props.title}
      </p>
    </div>
  );
}

export default FilterCheckbox;