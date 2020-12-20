import React from 'react';

const TextInput = (props) => {
  const {
    handleChange,
    val,
    placeholder,
    id,
    name
  } = props;
  return (
    <input type="text"
      name={name}
      id={id}
      value={val}
      onChange={e => handleChange(e.target.value)}
      placeholder={placeholder && placeholder}
    />
  );
}

export default TextInput;