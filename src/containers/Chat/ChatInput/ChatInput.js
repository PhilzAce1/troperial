import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../../libs/conversationHelpers';
import './ChatInput.css';
import ListingCard from '../../../components/ListingCard/ListingCard';
import {
  listingChanged,
  newExternalMessage,
  updateMessageStack,
  currentUserMessage,
} from '../../../actions/conversationActions';
import sendIcon from '../../../assets/svgs/send-icon.svg';
import { getStack } from '../helpers';
const ChatInput = ({
  listing,
  listingChanged,
  conversation,
  onMessageSubmitted,
  currentUserMessage,
  selectedConversation,
  newExternalMessage,
  user,
  state,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const handleChange = (e) => {
    setTextMessage(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTextMessage('');
    const stackId = getStack(selectedConversation.stack);
    if (textMessage === '') return;
    const listings = listing === undefined ? false : listing.open;
    if (listings) {
      currentUserMessage(
        selectedConversation.id,
        textMessage,
        stackId,
        true,
        conversation.user.id,
        listing.by,
        listing.have,
        listing.need,
        listing.rate,
      );
      listingChanged(false);
      const msg = await createMessage(
        stackId,
        true,
        selectedConversation.id,
        textMessage,
        conversation.user.id,
        listing.by,
        listing.have,
        listing.need,
        listing.rate,
      );

      return updateMessageStack(
        selectedConversation.id,
        msg.stackId,
        msg.newMessage.data.createMessage.createdAt,
      );
      // return newExternalMessage(
      //   selectedConversation.id,
      //   newMessage.data.createMessage.content,
      //   newMessage.data.createMessage.createdAt,
      //   true,
      //   newMessage.data.createMessage.authorId,
      //   listing.by,
      //   listing.have,
      //   listing.need,
      //   listing.rate,
      // );
    }

    currentUserMessage(
      selectedConversation.id,
      textMessage,
      stackId,
      false,
      conversation.user.id,
    );
    const msg = await createMessage(
      stackId,
      false,
      selectedConversation.id,
      textMessage,
      conversation.user.id,
    );
    console.log(msg);
    return updateMessageStack(
      selectedConversation.id,
      msg.stackId,
      msg.newMessage.data.createMessage.createdAt,
    );
  };

  return (
    <div className="chat__input">
      <div className="chat__input-listing">
        {listing !== undefined && listing.open && (
          <ListingCard listing={listing} />
        )}
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
              onClick={
                () => console.log('workingin')
                // setShareAccountDetails((state) => !state)
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

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    listing: state.conversation.listing,
    selectedConversation: state.conversation.selectedConversation,
    state,
  };
};
const mapDispatchToProps = (dispatch) => ({
  currentUserMessage: (
    conversationId,
    textMessage,
    stackNumber,
    isListing,
    authorId,
    by,
    have,
    need,
    rate,
  ) =>
    dispatch(
      currentUserMessage(
        conversationId,
        textMessage,
        stackNumber,
        isListing,
        authorId,
        by,
        have,
        need,
        rate,
      ),
    ),
  listingChanged: (status, by, have, need, rate) =>
    dispatch(listingChanged(status, by, have, need, rate)),

  updateMessageStack: (conversationId, stackNUmber) =>
    dispatch(updateMessageStack(conversationId, stackNUmber)),
  newExternalMessage: (
    conversationId,
    textMessage,
    createdAt,
    isListing,
    by,
    have,
    need,
    rate,
  ) =>
    dispatch(
      newExternalMessage(
        conversationId,
        textMessage,
        createdAt,
        isListing,
        by,
        have,
        need,
        rate,
      ),
    ),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatInput);
