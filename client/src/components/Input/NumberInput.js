import React from 'react';

const NumberInput = (props) => {
  const {
    handleChange,
    value,
    name,
    id,
    placeholder
  } = props;
  return (
    <input type="number" name={name} id={id} value={value} onChange={e => handleChange(e)} placeholder={placeholder && placeholder} />
  );
}

export default NumberInput;