import React from 'react';
import dp from '../../assets/images/profile-picture.png';
import './UserConvoButton.css';

const UserConvoButton = ({
  conversation,
  isActive,
  onConversationItemSelected,
}) => {
  return (
    <button
      className={btnClass}
      onClick={() => onConversationItemSelected(conversation.id)}
    >
      <span>
        <img className="user-profile-picture" src={dp} alt="dp" />
      </span>
      <span className="username">
        @{conversation.title.split(' ')[0]}
      </span>
      {conversation.messages.some(
        (message) => message.seen === false,
      ) && <span className="unread-messages"></span>}
    </button>
  );
};

export default UserConvoButton;
