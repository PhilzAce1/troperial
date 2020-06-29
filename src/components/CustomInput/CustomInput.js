import React, {useEffect, useState} from 'react';
import './CustomInput.css';

const CustomInput = ({
  message,
  label,
  placeholder,
  name,
  onChange,
  type,
  showError,
  register,
  hint,
  disabled,
  defaultValue
}) => {
  const [input, setInput] = useState('')
  useEffect(() => {
    setInput(defaultValue)
  }, [defaultValue])
  return (
    <div className="customInputContainer">
      <div className="customInputContainer__error error-bubble">
        {message}
      </div>
      <div className="customInputContainer__input-group">
        <label className="custom-label">{label}</label>
        <input
          ref={register}
          className={showError === true ? 'error' : ''}
          name={name}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={input}
        />
        {hint && (
          <div className="customInputContainer__input-hint">
            {hint}
          </div>
        )}
      </div>
    </div>
  );
};
CustomInput.defaultProps = {
  hint: false,
  defaultValue: ''
};

export default CustomInput;
