import React from 'react';
import './Button.scss';

const Button = (props) => {
  const {
    handleClick,
    type,
    selected,
    classNames
  } = props;
  return (
    <button
      onClick={handleClick}
      className={`btn btn-${type} ${selected !== false ? 'selected' : ''} ${classNames ? classNames : ""}`}
    >{props.children}</button>
  );
}

export default Button;