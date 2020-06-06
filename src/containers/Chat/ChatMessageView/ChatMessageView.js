import React from 'react';
import './ChatMessageView.css';
import ChatInput from '../ChatInput/ChatInput';
import dp from '../../../assets/images/profile-picture.png';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatBubble from '../../../components/ChatBubble/ChatBubble';
import ListingChatBubble from '../../../components/ListingChatBubble/ListingChatBubble';
import BankAccountChatBubble from '../../../components/BankAccountChatBubble/BankAccountChatBubble';

const ChatMessageView = () => {
  const userheaderTitle = (username) => {
    return (
      <button className="user__header-title">
        <img
          className="user__header-temporary-dp"
          src={dp}
          alt="user dp"
        />
        <span className="user__header-username">@{username}</span>
      </button>
    );
  };
  return (
    <section className="message__view">
      <header className="message__view--header">
        {userheaderTitle('username')}
      </header>
      <main className="chat-feed">
        <Scrollbars
          style={{ height: '100%' }}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
            {/* Chat feed */}

            <ChatBubble fromMe={true}>hey i'm runo</ChatBubble>
            <ChatBubble>hey i'm tega</ChatBubble>
            <ChatBubble fromMe={true}>cool</ChatBubble>
            <ChatBubble fromMe={true}>i'm from delta</ChatBubble>
            <ChatBubble fromMe={true}>cool</ChatBubble>
            <ChatBubble fromMe={true}>i'm from delta</ChatBubble>
            <ChatBubble fromMe={true}>cool</ChatBubble>
            <ChatBubble fromMe={true}>i'm from delta</ChatBubble>
            <ChatBubble>looks good</ChatBubble>
            <ChatBubble>looks good</ChatBubble>
            <ListingChatBubble have="$200" need="12" by="runo"/>
            <ListingChatBubble have="$200" need="12" by="runo" fromMe={true}/>
            <ChatBubble fromMe={true}>i'm from delta</ChatBubble>
            <ChatBubble fromMe={true}>cool</ChatBubble>
            <ChatBubble fromMe={true}>i'm from delta</ChatBubble>
            <BankAccountChatBubble fromMe={true}/>
            <BankAccountChatBubble/>

        </Scrollbars>
      </main>
      <section className="message__view--input-container">
        <ChatInput />
      </section>
    </section>
  );
};

export default ChatMessageView;
