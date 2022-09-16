import React from "react";

function MoviesError(props) {

  return (
    <div className="moviesError">
      <p className="moviesError__title">{props.searchMessage}</p>
    </div>
  );
}

export default MoviesError;