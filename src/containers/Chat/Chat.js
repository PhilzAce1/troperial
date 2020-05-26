import React from 'react';
import ChatConversationList from './ChatConversationList/ChatConversationList';
import ChatMessageView from './ChatMessageView/ChatMessageView';
import ChatUserProfile from './ChatUserProfile/ChatUserProfile';
import './Chat.css';

const Chat = () => {
    return (
        <section className="chat__container">
            chat component is set
            <ChatConversationList/>
            <ChatMessageView/>
            <ChatUserProfile/>
        </section>
    )
}

export default Chat
