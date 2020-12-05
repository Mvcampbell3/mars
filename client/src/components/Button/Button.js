import React from 'react';

const Button = (props) => {
  const {
    handleClick
  } = props;
  return (
    <button onClick={handleClick}>{props.children}</button>
  );
}

export default Button;