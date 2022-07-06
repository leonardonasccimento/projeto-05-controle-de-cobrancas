import { useState } from 'react';
import EyeClose from '../../assets/eye-close-icon.svg';
import EyeOpen from '../../assets/eye-open-icon.svg';
import './styles.css';

function Input({ name, type, placeholder, handleOnChange, value, required }) {
  const [passwordType, setPasswordType] = useState('password');

  function togglePasswordType() {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  }

  return (
    <div className="item">
      {type === "password" ? (
        <>
          <input
            type={passwordType}
            name={name}
            id={name}
            placeholder={placeholder}
            onChange={handleOnChange}
            value={value}
            required={required}
          />
          <img
            src={passwordType === "password" ? EyeClose : EyeOpen}
            alt="password"
            onClick={togglePasswordType}
          />
        </>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
          required={required}
        />
      )}
    </div>
  );
}

export default Input;