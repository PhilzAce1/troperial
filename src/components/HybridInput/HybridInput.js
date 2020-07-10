import React, { useState } from 'react';
import './HybridInput.css';
import { supported_countries } from '../../constants/supported_currencies';
import { currency_titles } from '../../constants/currency_titles';
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
}) => {
  const [dropdown, setDropdown] = useState(false);
  const showDropdown = () => setDropdown(!dropdown);
  const onChangeCurrency = (currency) => {
    changeCurrencyHandler(currency);
    showDropdown();
  };
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
              className="country-dropdown fas fa-angle-down"
              onClick={showDropdown}
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
        />
      </div>

      {dropdown === false ? null : (
        <section className="custom__dropdown">
          <div className="option">
            {supported_countries.map((country) => (
              <div
                className="select-currency-btn"
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
              </div>
            ))}
          </div>
        </section>
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
export default HybridInput;
