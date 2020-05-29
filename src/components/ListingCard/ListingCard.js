import React from 'react';
import './ListingCard.css';

const ListingCard = () => {
  return (
    <div className="listing-card">
      <div className="have-block">
        <span className="label">have</span>
        <p className="value">$1500</p>
      </div>
      <div className="need-block">
        <span className="label">need</span>
        <p className="value">(NGN) Nigerian Naira</p>
      </div>
      <div className="listing-card-horizontal-line"></div>
      <div className="preferred-rate">
        <span className="label">preferred rate</span>
        <p className="value">1 USD (NGN) > (NGN) 467</p>
        <p className="by">
          by <span className="username">@gidigbi</span>
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
