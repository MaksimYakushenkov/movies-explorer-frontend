import React from 'react';

function Stroke(props) {
  return (
    <div className={`stroke ${props.data ? props.data : ''} ${props.additional ? props.additional : ''}`}></div>
  );
}

export default Stroke;