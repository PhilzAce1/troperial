import React from 'react';
import './ChatInput.css';
import ListingCard from '../../../components/ListingCard/ListingCard';

import sendIcon from '../../../assets/svgs/send-icon.svg';
const ChatInput = () => {
  return (
    <div className="chat__input">
      <div className="chat__input-listing">
          <ListingCard/>
      </div>
      <div className="chat__input-field-container">
        <input type="text" placeholder="send messsage to @gidigbi" className="chat__input-field" />
        <button className="send-message-btn"><span className="large-screen-send">send</span> <img src={sendIcon} alt="send icon"/></button>
      </div>
      <div>
        {/* mobile quick actions */}
        <div className="mobile-quick-actions">
          <button className="quick-actions-btn">Quick actions</button>
          <div className="quick-actions-options">
            <button className="share-account-details">
              Share account details
            </button>
            <button className="update-listing-status">
              Update listing status
            </button>
          </div>
        </div>

        {/* desktop quick actions */}
        <div className="largescreen-quick-actions">
          <span className="quick-actions-btn">Quick actions</span>
           <div className="vertical-line"></div>
          <div className="quick-actions-options">
            <button className="share-account-details">
              Share account details
            </button>
            <button className="update-listing">
              Update listing status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
