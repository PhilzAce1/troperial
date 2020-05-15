import React, { useState } from 'react';
import './HybridInput.css';
import ReactCountryFlag from 'react-country-flag';

const HybridInput = ({line}) => {
  const [dropdown, setDropdown] = useState(false);

  const showDropdown = () => {
    const state = dropdown;
    setDropdown(!state);
  };
  return (
    <div
      className="hybridInput__container"
    >
      <label
        className="hybridInput__label"
        htmlFor="I have"
        id="have"
      >
        I have
      </label>
      <div className="hybridInput__wrapper">
        <button className="hybridInput__custom-select" name="country" onClick={showDropdown}>
          <ReactCountryFlag
            countryCode="NG"
            svg
            style={{
              width: '1.5em',
              height: '1.5em',
            }}
            title="NG"
          />
          {'  '}
          <i className="fas fa-angle-down"></i>
        </button>
        <input className="hybridInput__textInput" type="text" />
      </div>

      {dropdown === false ? null : (
        <section className="custom__dropdown">
          <div className="option">
            <button>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  borderRadius: '8px',
                }}
                title="A"
              />
            </button>
          </div>
          <div className="option">
            <button>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  borderRadius: '8px',
                }}
                title="A"
              />
            </button>
          </div>

          <div className="option">
            <button>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  borderRadius: '8px',
                }}
                title="A"
              />
            </button>
          </div>

          <div className="option">
            <button>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  borderRadius: '8px',
                }}
                title="A"
              />
            </button>
          </div>

          <div className="option">
            <button>
              <ReactCountryFlag
                countryCode="US"
                svg
                style={{
                  width: '1.5em',
                  height: '1.5em',
                  borderRadius: '8px',
                }}
                title="A"
              />
            </button>
          </div>

         
        </section>
      )}
      {line === false ? null:<div className="hybridInput__optional-line"></div>}
    </div>
  );
};

HybridInput.defaultProps = {
    line: false,
    selectWidth: '20%',
    inputWidth: '100%'
}
export default HybridInput;
