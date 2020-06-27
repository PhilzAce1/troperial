import React, { useEffect } from 'react';
import dp from '../../assets/images/profile-picture.png';
import './UserConvoButton.css';
import { connect } from 'react-redux';

const UserConvoButton = ({
  conversation,
  isActive,
  onConversationItemSelected,
  conversations,
  state,
}) => {
  useEffect(() => {}, [conversation.messages, conversations, state]);
  return (
    <button
      className={`user-convo-btn ${isActive && 'active-chat'}`}
      style={{
        outline: 'none',
      }}
      onClick={() => {
        return onConversationItemSelected(conversation.id);
      }}
    >
      <span>
        <img className="user-profile-picture" src={dp} alt="dp" />
      </span>
      <span className="username">@{conversation.title}</span>
      {conversation.messages.some(
        (message) => message.read === false,
      ) && <span className="unread-messages"></span>}
    </button>
  );
};
const mapStateToProps = (state) => ({
  conversations: state.conversation.conversations,
  state,
});

export default connect(mapStateToProps)(UserConvoButton);
