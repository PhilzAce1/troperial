import React from 'react';
import './ListingChatBubble.css';

const ListingChatBubble = ({ have, need, by, fromMe }) => {
  return (
    <div
      className={`listing-chat-bubble ${
        fromMe === true
          ? 'listingBubble_fromMe'
          : 'listingBubble_fromContact'
      }`}
    >
      <div className="have-block">
        <span className="label">have</span>
        <p className="value">{have}</p>
      </div>
      <div className="need-block">
        <span className="label">need</span>
        <p className="value">{need}</p>
      </div>
      <div className="listing-card-horizontal-line"></div>
      <div className="preferred-rate">
        <span className="label">preferred rate</span>
        <p className="value">1 USD (NGN) `{'>'}` (NGN) 467</p>
        <p className="by">
          by <span className="username">{by}</span>
        </p>
      </div>
    </div>
  );
};

// ListingChatBubble.defaultProps = {
//   fromMe: false,
// };

export default ListingChatBubble;
