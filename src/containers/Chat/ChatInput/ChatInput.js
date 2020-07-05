import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../../libs/conversationHelpers';
// import { onCreateMessage as OnCreateMessage } from '../../../libs/graphql';
// import { createMessage as CreateMessage } from '../../../graphql/mutations';
// import { API, graphqlOperation } from 'aws-amplify';
import './ChatInput.css';
import ListingCard from '../../../components/ListingCard/ListingCard';
import {
  listingChanged,
  updateMessageStack,
  currentUserMessage,
  sortConversation,
} from '../../../actions/conversationActions';
import sendIcon from '../../../assets/svgs/send-icon.svg';
import { getStack } from '../helpers';
const ChatInput = ({
  listing,
  listingChanged,
  conversation,
  currentUserMessage,
  selectedConversation,
  scrollToBottom,
  user,
  updateMessageStack,
  sortConversation,
  handleBankAccountList,
  state,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const handleChange = (e) => {
    setTextMessage(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      scrollToBottom();

      setTextMessage('');
      const stackId = getStack(selectedConversation.stack);
      if (textMessage === '') return;
      const listings = listing === undefined ? false : listing.open;
      if (listings) {
        scrollToBottom();
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
        scrollToBottom();

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
        scrollToBottom();
        if (msg.newMessage.data.createMessage.createdAt) {
          updateMessageStack(
            selectedConversation.id,
            msg.stackId,
            msg.newMessage.data.createMessage.createdAt,
            msg.newMessage.data.createMessage.id,
          );
          return setTimeout(() => {
            sortConversation();
          }, 1000);
        }
      }

      currentUserMessage(
        selectedConversation.id,
        textMessage,
        stackId,
        false,
        conversation.user.id,
      );
      setTimeout(() => {
        return scrollToBottom();
      }, 1000);

      const msg = await createMessage(
        stackId,
        false,
        selectedConversation.id,
        textMessage,
        conversation.user.id,
      );
      scrollToBottom();
      updateMessageStack(
        selectedConversation.id,
        msg.stackId,
        msg.newMessage.data.createMessage.createdAt,
        msg.newMessage.data.createMessage.id,
      );
      setTimeout(() => {
        return sortConversation();
      }, 2500);
    } catch (error) {}
  };

  return (
    <div className="chat__input">
      {listing !== undefined && listing.open && (
        <div className="chat__input-listing">
          <ListingCard listing={listing} />
          {/* listings card */}
          {/* UNCOMMENT TO USE AND MANIPULATE */}
          {/* <div className="chat__input-listing">
          <ListingCard have="NGN200" need="US Dollars" by="Runo" />
      </div> */}
          {/* end of listings card */}
        </div>
      )}

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
          placeholder={`send messsage to ${user ? user : ''}`}
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
          <button
            className="quick-actions-btn"
            onClick={() => setShowOptions(!showOptions)}
          >
            Quick actions
          </button>

          {showOptions && (
            <Fragment>
              <div className="quick-actions-options">
                <button className="share-account-details">
                  Share account details
                </button>
                <button className="update-listing-status">
                  Update listing status
                </button>
              </div>
            </Fragment>
          )}
        </div>

        {/* desktop quick actions */}
        <div className="largescreen-quick-actions">
          <span className="quick-actions-btn">Quick actions</span>
          <div className="vertical-line"></div>
          <div className="quick-actions-options">
            <button
              className="share-account-details"
              onClick={handleBankAccountList}
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

  updateMessageStack: (conversationId, stackNUmber, createdAt, id) =>
    dispatch(
      updateMessageStack(conversationId, stackNUmber, createdAt, id),
    ),
  sortConversation: () => dispatch(sortConversation()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatInput);
