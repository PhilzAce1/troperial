import React from 'react';
import './ChatBubble.css';
import moment from 'moment';
const ChatBubble = ({ fromMe, children, isLoading, createdAt }) => {
  createdAt = parseInt(createdAt);
  return (
    <div className="chat-bubble-container">
      <div
        className={`chat-bubble ${
          fromMe === true ? 'from_me' : 'from_contact'
        }`}
      >
        {children}
      </div>
      <div
        className={`time ${fromMe === true ? 'from_me-time' : ''}`}
      >
        {moment(createdAt).format('LT')}
      </div>
    </div>
  );
};

ChatBubble.defaultProps = {
  fromMe: false,
};
export default ChatBubble;
