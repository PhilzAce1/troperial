import React, { useState } from 'react';
import './HybridInput.css';
import CurrencyFlag from 'react-currency-flags';
import { supported_countries } from '../../constants/supported_currencies';
const HybridInput = ({label, line, changeCurrencyHandler, currency, value, readOnly, onChange, name}) => {
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => {
    const state = dropdown;
    setDropdown(!state);
  };
  const onChangeCurrency = (currency) => {
    changeCurrencyHandler(currency);
    showDropdown()
  }
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
        <span
          className="hybridInput__custom-select"
          name="country"
          onClick={showDropdown}
        >
          <CurrencyFlag currency={currency} size="md" />
          {'  '}
          <i className="fas fa-angle-down"></i>
        </span>
        <input name={name} onChange={onChange} className="hybridInput__textInput" value={value} type="text" readOnly={readOnly}/>
      </div>

      {dropdown === false ? null : (
        <section className="custom__dropdown">
          <div className="option">
            {supported_countries.map((country) => (
              <div key={country.id} onClick={() => onChangeCurrency(country.currency)} className="item"><CurrencyFlag currency={country.currency} size="lg" /></div>
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
};
export default HybridInput;
