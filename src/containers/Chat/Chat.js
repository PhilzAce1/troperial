import React from 'react';
import ChatConversationList from './ChatConversationList/ChatConversationList';
import ChatMessageView from './ChatMessageView/ChatMessageView';
import ChatUserProfile from './ChatUserProfile/ChatUserProfile';
import './Chat.css';

import NavBar from '../../components/NavBar/NavBar';
const Chat = () => {

  return (
    <React.Fragment>
      <NavBar page="Messages" icon="icon-messages" />
      <div className="chat-main-container">
        <section className="chat__container">
          <div className="chat-grid-container">
            <ChatConversationList />
            <ChatMessageView />
            <ChatUserProfile />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default Chat;
