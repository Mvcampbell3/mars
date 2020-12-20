import React from 'react';
import './Button.scss'

const TextButton = (props) => {
  const {
    handleClick
  } = props;
  return (
    <button className="text-btn" onClick={handleClick}>{props.children}</button>
  );
}

export default TextButton;