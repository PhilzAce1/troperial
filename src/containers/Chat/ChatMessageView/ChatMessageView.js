import React, { useEffect, useRef } from 'react';
import './ChatMessageView.css';
import ChatInput from '../ChatInput/ChatInput';
import dp from '../../../assets/images/profile-picture.png';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatBubble from '../../../components/ChatBubble/ChatBubble';

import ScrollToBottom, {
  useScrollToBottom,
  useSticky,
} from 'react-scroll-to-bottom';

const ChatMessageView = ({
  messages,
  selectedConversation,
  onMessageSubmitted,
}) => {
  const lastMessage = useRef(null);
  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView({ behavior: 'smooth' });
  };
  // const scrollToBottom = useScrollToBottom();
  const [sticky] = useSticky();
  // map messageList
  useEffect(() => {
    // scrollToBottom();
  });
  const messageList = messages.map((message, i) => (
    <ChatBubble fromMe={message.isMyMessage}>
      {message.messageText}
    </ChatBubble>
  ));
  const userheaderTitle = () => {
    return (
      <button className="user__header-title">
        <img
          className="user__header-temporary-dp"
          src={dp}
          alt="dp"
        />
        <span className="user__header-username">
          @{selectedConversation.title}
        </span>
      </button>
    );
  };
  return (
    <section className="message__view">
      <header className="message__view--header">
        {userheaderTitle()}
      </header>
      <main className="chat-feed">
        <Scrollbars
          style={{ height: '100%' }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <ScrollToBottom mode="bottom">
            {/* Chat feed */}
            {messageList}
            <div ref={lastMessage} />
          </ScrollToBottom>
        </Scrollbars>
      </main>
      <section className="message__view--input-container">
        <ChatInput onMessageSubmitted={onMessageSubmitted} />
      </section>
    </section>
  );
};

export default ChatMessageView;
