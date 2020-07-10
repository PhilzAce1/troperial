import React, { useEffect } from 'react';
import Avatar from 'react-avatar';
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
  let userAvatar = (
    <img className="user-profile-picture" src={dp} alt="dp" />
  );
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
        {/* {conversation.chatUserProfile.data && (
          <Avatar
            name={`${conversation.chatUserProfile.data.firstName} ${selectedConversation.chatUserProfile.data.lastName}`}
            size="150"
            email={conversation.chatUserProfile.data.email}
          />
        )} */}
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
