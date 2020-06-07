import React from 'react';
import './ListingCard.css';

const ListingCard = ({ listing }) => {
  if (listing === undefined) {
    listing = defaultProps;
  }
  return (
    <div className="listing-card">
      <div className="have-block">
        <span className="label">have</span>
        <p className="value">{listing.have || null}</p>
      </div>
      <div className="need-block">
        <span className="label">need</span>
        <p className="value">{listing.need || null}</p>
      </div>
      <div className="listing-card-horizontal-line"></div>
      <div className="preferred-rate">
        <span className="label">preferred rate</span>
        <p className="value">{listing.rate || null}</p>
        <p className="by">
          by <span className="username">@{listing.by || null}</span>
        </p>
      </div>
    </div>
  );
};
const defaultProps = {
  have: 'null',
  need: 'null',
  by: 'null',
  rate: 'null',
};
export default ListingCard;
