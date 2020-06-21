import React, { useEffect } from 'react';
import dp from '../../assets/images/profile-picture.png';
import './UserConvoButton.css';

const UserConvoButton = ({
  conversation,
  isActive,
  onConversationItemSelected,
}) => {
  useEffect(() => {}, [conversation.messages]);
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

export default UserConvoButton;
