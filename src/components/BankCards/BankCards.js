import React, { Fragment, useState } from 'react';
import './BankCards.css';
import ReactCountryFlag from 'react-country-flag';
const BankCards = ({
  bankName,
  accountName,
  routingCode,
  accountNumber,
}) => {
  const [toggle, setToggleState] = useState(false);
  const toggleDetails = () => setToggleState(!toggle);
  return (
    <div className="bank-card">
      <header>
        <ReactCountryFlag
          countryCode="NG"
          svg
          style={{
            width: '1.25em',
            height: '1.25em',
          }}
          title="NG"
        />{' '}
        (NGN) Nigerian Naira
      </header>
      <div className="horizontal-line"></div>
      <div className="bank__details-grid">
        <div className="bank__details_grid-item">
          <span className="label">Bank</span>
          <span className="value">Chase</span>
        </div>
        {toggle && (
          <Fragment>
            <div className="bank__details_grid-item">
              <span className="label">Account Number</span>
              <span className="value">2989128974</span>
            </div>
            <div className="bank__details_grid-item">
              <span className="label">ABA/ACH routing code</span>
              <span className="value">3883765</span>
            </div>
            <div className="bank__details_grid-item">
              <span className="label">Account Name</span>
              <span className="value">Peter Olusesan</span>
            </div>
          </Fragment>
        )}
        <button className="bank_button" onClick={toggleDetails}>
          {toggle ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    </div>
  );
};

export default BankCards;
