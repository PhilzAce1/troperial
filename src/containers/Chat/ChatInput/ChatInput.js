import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createMessage } from '../../../libs/conversationHelpers';
import close from '../../../assets/images/Close.png';
import './ChatInput.css';
import ListingCard from '../../../components/ListingCard/ListingCard';
import {
  listingChanged,
  updateMessageStack,
  currentUserMessage,
  sortConversation,
  setReminder,
} from '../../../actions/conversationActions';
import sendIcon from '../../../assets/svgs/send-icon.svg';
import { getStack } from '../helpers';
const ChatInput = ({
  // listing,
  listingChanged,
  conversation,
  currentUserMessage,
  selectedConversation,
  scrollToBottom,
  user,
  updateMessageStack,
  sortConversation,
  handleBankAccountList,
  handleCloseTrade,
  setReminder,
  transaction,
  state,
}) => {
  console.log(selectedConversation, transaction)
  const [showOptions, setShowOptions] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const listing = selectedConversation.listing;
  const handleChange = (e) => {
    setTextMessage(e.target.value);
  };
  console.log(currentUserMessage);
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
        listingChanged(
          false,
          null,
          null,
          null,
          null,
          null,
          selectedConversation.id,
        );
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {selectedConversation.isReminder && (
        <div className="reminder">
          <p>
            Looks like you've both shared account details. update the
            status of this transaction?
          </p>{' '}
          <button
            style={{
              background: 'none',
              border: '0',
              outline: 'none',
            }}
            onClick={() => {
              setReminder(false);
            }}
          >
            <img className="close-reminder" src={close} alt="close" />
          </button>
        </div>
      )}
      <div className="chat__input">
        {listing !== undefined && listing.open && (
          <div className="chat__input-listing">
            <ListingCard listing={listing} />
          </div>
        )}
        <form
          className="chat__input-field-container"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder={`message @${user ? user : ''}`}
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
                  <button
                    className="share-account-details"
                    onClick={handleBankAccountList}
                  >
                    Share account details
                  </button>
                  {transaction && (
                <button
                className="update-listing-status"
                onClick={handleCloseTrade}
              >
                Update listing status
              </button>
              )}
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
              {transaction && (
                <button
                className="update-listing"
                onClick={handleCloseTrade}
              >
                Update listing status
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    listing: state.conversation.listing,
    selectedConversation: state.conversation.selectedConversation,
    transaction: state.conversation.selectedConversation.listing.transaction,
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
  listingChanged: (status, by, have, need, rate, extra, id) =>
    dispatch(listingChanged(status, by, have, need, rate, extra, id)),

  updateMessageStack: (conversationId, stackNUmber, createdAt, id) =>
    dispatch(
      updateMessageStack(conversationId, stackNUmber, createdAt, id),
    ),
  sortConversation: () => dispatch(sortConversation()),
  setReminder: () => dispatch(setReminder()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatInput);

// setReminder
