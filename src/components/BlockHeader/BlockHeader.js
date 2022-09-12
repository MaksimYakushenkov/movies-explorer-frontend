import React from 'react';

function BlockHeader(props) {
  return (
    <div className="block">
      <h3 className="block__title">{props.title}</h3>
      <div className="block__title-border"></div>
    </div>
  );
}

export default BlockHeader;