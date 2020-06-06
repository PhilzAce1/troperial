import React from 'react';
import './BankAccountChatBubble.css';
import ReactCountryFlag from 'react-country-flag';
const BankAccountChatBubble = ({
  bankName,
  accountName,
  routingCode,
  accountNumber,
  fromMe
}) => {
  return (
    <div className={`BankAccountChatBubble ${fromMe === true ? 'BankAccountChatBubble__fromMe' : 'BankAccountChatBubble__fromContact'}`}>
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
      </div>
    </div>
  );
};
BankAccountChatBubble.defaultProps = {
    fromMe: false
}
export default BankAccountChatBubble;
