import React, { useEffect, useRef } from 'react';
import './ChatMessageView.css';
import ChatInput from '../ChatInput/ChatInput';
import dp from '../../../assets/images/profile-picture.png';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatBubble from '../../../components/ChatBubble/ChatBubble';
import ScrollToBottom from 'react-scroll-to-bottom';
import { connect } from 'react-redux';
import { getMessages } from '../../../libs/conversationHelpers';
// import ListingCard from '../../../components/ListingCard';
import ListingCard from '../../../components/ListingCard/ListingCard';
import { loadMessages } from '../../../actions/conversationActions';
const ChatMessageView = ({
  messages,
  selectedConversation,
  onMessageSubmitted,
  loadMessages,
  state,
}) => {
  const lastMessage = useRef(null);
  const scrollToBottom = () => {
    lastMessage.current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    });
  };
  const messageLoader = async () => {
    const message = await getMessages(selectedConversation.id);
    if (!Array.isArray(message))
      return alert('could not get Message');
    loadMessages(message, selectedConversation.id);
  };

  useEffect(() => {
    console.log(selectedConversation);
    if (
      selectedConversation &&
      selectedConversation.messages &&
      selectedConversation.messages.length < 1
    ) {
      messageLoader();
    }
    scrollToBottom();
  }, [selectedConversation.id]);
  let messageList;
  if (messages && messages.length > 0) {
    messageList = messages.map((message, i) => {
      const listing = {
        by: message.by,
        have: message.have,
        need: message.need,
        rate: message.rate,
      };
      return (
        <div key={i}>
          {message.isListing && <ListingCard listing={listing} />}
          <ChatBubble fromMe={message.isMyMessage}>
            {message.messageText}
          </ChatBubble>
        </div>
      );
    });
  } else {
    messageList = <h1>Something </h1>;
  }
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
          </ScrollToBottom>
          {/* for scrollToBottom */}
          <div ref={lastMessage} />
        </Scrollbars>
      </main>
      <section className="message__view--input-container">
        <ChatInput
          onMessageSubmitted={onMessageSubmitted}
          user={selectedConversation.title}
        />
      </section>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    conversation: state.conversation,
    step: state.ui.step,
    user: state.auth,
    selectedConversation: state.conversation.selectedConversation,
    state,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loadMessages: (message, conversationId) =>
    dispatch(loadMessages(message, conversationId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatMessageView);
