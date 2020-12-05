import React from 'react';

const NumberInput = (props) => {
  const {
    handleChange,
    val
  } = props;
  return (
    <input type="number" name="" id="" value={val} onChange={e => handleChange(e)} />
  );
}

export default NumberInput;