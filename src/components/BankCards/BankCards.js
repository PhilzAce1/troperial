import React, { Fragment, useState } from 'react';
import './BankCards.css';
import ReactCountryFlag from 'react-country-flag';
const BankCards = ({
  accountNumber,
  bvnNumber,
  primaryBank,
 customerAccountNumber,
 sortCode,
  routingNumber,
  externalAccountSubType,
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
          <span className="value">{primaryBank && primaryBank}</span>
        </div>
        {toggle && (
          <Fragment>
            {customerAccountNumber && (
              <div className="bank__details_grid-item">
                <span className="label">Account Number</span>
                <span className="value">{customerAccountNumber}</span>
              </div>
            )}
            {accountNumber && (
              <div className="bank__details_grid-item">
                <span className="label">Account Number</span>
                <span className="value">{accountNumber}</span>
              </div>
            )}
            {externalAccountSubType && (
              <div className="bank__details_grid-item">
                <span className="label">Account Type</span>
                <span className="value">
                  {externalAccountSubType}
                </span>
              </div>
            )}
            {routingNumber && (
              <div className="bank__details_grid-item">
                <span className="label">Routing Number</span>
                <span className="value">{routingNumber}</span>
              </div>
            )}
            {bvnNumber && (
              <div className="bank__details_grid-item">
                <span className="label">BVN Number</span>
                <span className="value">{bvnNumber}</span>
              </div>
            )}
            {sortCode && (
              <div className="bank__details_grid-item">
                <span className="label">Sort Code</span>
                <span className="value">{sortCode}</span>
              </div>
            )}
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
