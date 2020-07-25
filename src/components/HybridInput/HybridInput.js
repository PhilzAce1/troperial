import React, { useState, useEffect, useRef } from 'react';
import './HybridInput.css';
import { supported_countries } from '../../constants/supported_currencies';
import { currency_titles } from '../../constants/currency_titles';
import Dropdown from './Dropdown';

const HybridInput = ({
  label,
  line,
  changeCurrencyHandler,
  currency,
  value,
  readOnly,
  onChange,
  name,
  type,
  selectedCurrency,
  placeholder,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => setDropdown(!dropdown);
  const ref = useRef(null);
  const onChangeCurrency = (currency) => {
    changeCurrencyHandler(currency);
    showDropdown();
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
    }
};

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
        document.removeEventListener('click', handleClickOutside, true);
    };
});
  return (
    <div className="hybridInput__container">
      <label
        className="hybridInput__label"
        htmlFor="I have"
        id="have"
      >
        {label}
      </label>
      <div className="hybridInput__wrapper">
        <span className="hybridInput__custom-select" name="country">
          <img
            style={{ width: '19px' }}
            src={require(`../../assets/flags/${
              currency ? currency : 'NGN'
            }.png`)}
            alt={currency}
          />
          {changeCurrencyHandler === null ? null : (
            <i
            onClick={() => showDropdown()}
              className="country-dropdown fas fa-angle-down"
            ></i>
          )}
        </span>
        <input
          className="hybridInput__textInput"
          name={name}
          onChange={onChange}
          value={value}
          type={type}
          readOnly={readOnly}
          placeholder={placeholder}
          pattern="[0-9]*"
        />
      </div>

      {dropdown === false ? null : (
        <Dropdown wrappedRef={ref}>
          <div className="option">
            {supported_countries.map((country) => (
              <button
                role="button"
                className="select-currency-btn"
                disabled={selectedCurrency === country.currency ? true : false}
                key={country.id}
                onClick={() => onChangeCurrency(country.currency)}
              >
                <img
                  style={{ width: '19px' }}
                  src={require(`../../assets/flags/${country.currency}.png`)}
                  alt={country.currency}
                />
                {`  (${country.currency})`}{' '}
                {currency_titles[country.currency]}
              </button>
            ))}
          </div>
          </Dropdown>
      )}
      {line === false ? null : (
        <div className="hybridInput__optional-line"></div>
      )}
    </div>
  );
};

HybridInput.defaultProps = {
  line: false,
  selectWidth: '20%',
  inputWidth: '100%',
  currency: 'USD',
  changeCurrencyHandler: null,
  readOnly: false,
  type: 'text',
};

export default HybridInput
