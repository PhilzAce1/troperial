import React from 'react';
import './BankAccountList.css';
import CurrencyFlag from 'react-currency-flags';
import { currency_titles } from '../../constants/currency_titles';
const BankListCard = ({
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
  active,
  onClick,
  accountName
}) => {
  return (

    <div onClick={onClick} className={`${active ? "active-bank" : ""} bankList_button bank-card`}>
      <header>
        <CurrencyFlag currency={currency} width={19} />
        {currency_titles[currency]}
      </header>
      <div className="horizontal-line"></div>
      <div className="bank__details-grid">
      {userId && (
          <div className="bank__details_grid-item">
            <span className="label">User ID</span>
            <span className="value">{userId}</span>
          </div>
        )}

        {primaryBank && (
          <div className="bank__details_grid-item">
            <span className="label">Bank</span>
            <span className="value">
              {primaryBank}
            </span>
          </div>
        )}
        {customerAccountNumber && (
          <div className="bank__details_grid-item">
            <span className="label">Account Number</span>
            <span className="value">{customerAccountNumber}</span>
          </div>
        )}
            {accountName && (
                  <div className="bank__details_grid-item">
                    <span className="label">Account Name</span>
                    <span className="value">{accountName}</span>
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
BankListCard.defaultProps = {
    currency: 'NGN'
}
export default BankListCard;
