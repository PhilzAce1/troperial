import React, {useEffect} from 'react';
import ChatConversationList from './ChatConversationList/ChatConversationList';
import ChatMessageView from './ChatMessageView/ChatMessageView';
import ChatUserProfile from './ChatUserProfile/ChatUserProfile';
import './Chat.css';

import NavBar from '../../components/NavBar/NavBar';
const Chat = () => {

  // useEffect(() => {
  //   const mq = window.matchMedia("(min-width: 500px)");

  //   if(mq.matches){
  //     alert('window width is at least 500px')
  //   } else {
  //     alert('window width is less than 500')
  //   }

  // })
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
