import React from 'react';
import './XchangeRateBanner.css';
import svg from '../../assets/svgs/cad.svg';
const RateCard = () => {
  return (
    <div className="rateCard__container">
      <div className="currency_symbol">
        <img src={svg} alt="currency symbol" />
      </div>
      <div className="rates__container">
        <div className="buy__container">
          <p className="title">Buy</p>
          <p className="rates">
            USD 1{' '}
            <span className="banner-caret">
              <i className="fas fa-caret-right"></i>
            </span>{' '}
            NGN 420
          </p>
        </div>
        <div className="sell__container">
          <p className="title">Sell</p>
          <p className="rates">
            USD 1{' '}
            <span className="banner-caret">
              <i className="fas fa-caret-right"></i>
            </span>{' '}
            NGN 420
          </p>
        </div>
      </div>
    </div>
  );
};
export default RateCard;
