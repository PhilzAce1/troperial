import React from 'react';
import './BankAccountChatBubble.css';
import { currency_titles } from '../../constants/currency_titles';
const BankAccountChatBubble = ({
  accountNumber,
  bvnNumber,
  primaryBank,
  customerAccountNumber,
  sortCode,
  routingNumber,
  externalAccountSubType,
  zelleEmail,
  userId,
  currency,
  fromMe,
  accountName,
}) => {
  return (
    <div
      className={`BankAccountChatBubble ${
        fromMe === true
          ? 'BankAccountChatBubble__fromMe'
          : 'BankAccountChatBubble__fromContact'
      }`}
    >
      <header>
      <img style={{width: '19px'}} src={require(`../../assets/flags/${currency}.png`)} alt={currency_titles[currency]}/>
        {currency_titles[currency]}
      </header>
      <div className="horizontal-line"></div>
      <div className="bank__details-grid">
        {userId && (
          <div className="bank__details_grid-item">
            <span className="label">User ID</span>
            <span className="value">{userId && userId}</span>
          </div>
        )}
        {primaryBank && (
          <div className="bank__details_grid-item">
            <span className="label">Bank</span>
            <span className="value">
              {primaryBank && primaryBank}
            </span>
          </div>
        )}
        {customerAccountNumber && (
          <div className="bank__details_grid-item">
            <span className="label">Account Number</span>
            <span className="value">{customerAccountNumber}</span>
          </div>
        )}
        {zelleEmail && (
          <div className="bank__details_grid-item">
            <span className="label">Zelle Email</span>
            <span className="value">{zelleEmail}</span>
          </div>
        )}
        {accountNumber && (
          <div className="bank__details_grid-item">
            <span className="label">Account Number</span>
            <span className="value">{accountNumber}</span>
          </div>
        )}
        {accountName && (
          <div className="bank__details_grid-item">
            <span className="label">Account Name</span>
            <span className="value">{accountName}</span>
          </div>
        )}
        {externalAccountSubType && (
          <div className="bank__details_grid-item">
            <span className="label">Account Type</span>
            <span className="value">{externalAccountSubType}</span>
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
      </div>
    </div>
  );
};
BankAccountChatBubble.defaultProps = {
  fromMe: false,
};
export default BankAccountChatBubble;
