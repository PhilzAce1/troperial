import React from 'react';
import './ChatBubble.css';

const ChatBubble = ({ fromMe, children, isLoading }) => {
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
        12:33 PM
      </div>
    </div>
  );
};

ChatBubble.defaultProps = {
  fromMe: false,
};
export default ChatBubble;
