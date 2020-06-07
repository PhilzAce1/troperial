import React from 'react';
import './ChatBubble.css';
import moment from 'moment';
import PulseLoader from 'react-spinners/PulseLoader';
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
        {createdAt ? (
          moment(createdAt).format('LT')
        ) : (
          <PulseLoader size={5} />
        )}
      </div>
    </div>
  );
};

ChatBubble.defaultProps = {
  fromMe: false,
};
export default ChatBubble;
