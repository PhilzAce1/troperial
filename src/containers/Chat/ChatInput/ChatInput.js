import React, { useState } from 'react';
import './ChatInput.css';
import ListingCard from '../../../components/ListingCard/ListingCard';

import sendIcon from '../../../assets/svgs/send-icon.svg';
const ChatInput = ({ onMessageSubmitted, user }) => {
  const [showOptions, setShowOptions] = useState(false);

  const [shareAccountDetails, setShareAccountDetails] = useState(
    false,
  );
  const [textMessage, setTextMessage] = useState('');
  const handleChange = (e) => {
    setTextMessage(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onMessageSubmitted(textMessage);
    setTextMessage('');
  };

  return (
    <div className="chat__input">
      <div className="chat__input-listing">
        {shareAccountDetails && <ListingCard />}

        {/* listings card */}
        {/* UNCOMMENT TO USE AND MANIPULATE */}
        {/* <div className="chat__input-listing">
          <ListingCard have="NGN200" need="US Dollars" by="Runo" />
      </div> */}
        {/* end of listings card */}
      </div>
      {/* <div className="chat__input-field-container">
        <input
          type="text"
          placeholder="send messsage to @gidigbi"
          className="chat__input-field"
        />
        <button className="send-message-btn">
          <span className="large-screen-send">send</span>{' '}
          <img src={sendIcon} alt="send icon" />
        </button>
      </div> */}
      {/* <div className="chat__input-field-container"> */}
      <form
        className="chat__input-field-container"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder={`send messsage to ${user}`}
          className="chat__input-field"
          onChange={handleChange}
          value={textMessage}
        />
        <button className="send-message-btn">
          <span className="large-screen-send">send</span>{' '}  
          <img src={sendIcon} alt="send icon" />
        </button>
      </form>
      {/* </div> */}
      <div>
        {/* mobile quick actions */}
        <div className="mobile-quick-actions">
          <button className="quick-actions-btn" onClick={() => setShowOptions(!showOptions)}>Quick actions</button>
         
          {showOptions && <Fragment>
            <div className="quick-actions-options">
            <button className="share-account-details">
              Share account details
            </button>
            <button className="update-listing-status">
              Update listing status
            </button>
            </div>
            </Fragment>}
     
        </div>

        {/* desktop quick actions */}
        <div className="largescreen-quick-actions">
          <span className="quick-actions-btn">Quick actions</span>
          <div className="vertical-line"></div>
          <div className="quick-actions-options">
            <button
              className="share-account-details"
              onClick={() =>
                setShareAccountDetails((state) => !state)
              }
            >
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
