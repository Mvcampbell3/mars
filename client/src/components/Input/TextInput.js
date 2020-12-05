import React from 'react';

const TextInput = (props) => {
  const {
    handleChange,
    val
  } = props;
  return (
    <input type="text" name="" id="" value={val} onChange={e => handleChange(e)} />
  );
}

export default TextInput;