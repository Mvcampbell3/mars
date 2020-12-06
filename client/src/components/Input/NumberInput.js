import React from 'react';

const NumberInput = (props) => {
  const {
    handleChange,
    value,
    name,
    id
  } = props;
  return (
    <input type="number" name={name} id={id} value={value} onChange={e => handleChange(e)} />
  );
}

export default NumberInput;