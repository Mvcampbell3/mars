import React from 'react';
import './Input.scss';

const TextInput = (props) => {
  const {
    handleChange,
    val,
    placeholder,
    id,
    name,
    label
  } = props;

  return (
    <div className="field-container">
      {label && <label htmlFor="email-login" className="input-label">{label}</label>}
      <input
        className="input input-text"
        value={val}
        onChange={e => handleChange(e.target.value)}
        id={id}
        name={name}
        placeholder={placeholder && placeholder}
      />
    </div>
  );
}

export default TextInput;