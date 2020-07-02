import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import './ChatMessageView.css';
import ChatInput from '../ChatInput/ChatInput';
import dp from '../../../assets/images/profile-picture.png';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatBubble from '../../../components/ChatBubble/ChatBubble';
import ScrollToBottom from 'react-scroll-to-bottom';
import { connect } from 'react-redux';
import { getMessages } from '../../../libs/conversationHelpers';
// import ListingCard from '../../../components/ListingCard';
import ListingChatBubble from '../../../components/ListingChatBubble/ListingChatBubble';
import ScaleLoader from 'react-spinners/ScaleLoader';
import EmptyChatView from '../../../components/EmptyChatView/EmptyChatView';
import {
  loadMessages,
  updateSeen,
  sortConversation,
} from '../../../actions/conversationActions';
const ChatMessageView = ({
  messages,
  selectedConversation,
  onMessageSubmitted,
  loadMessages,
  conversation,
  updateSeen,
  state,
}) => {
  const lastMessage = useRef(null);
  const [loading, setLoading] = useState(false);
  const scrollToBottom = () => {
    const lM = document.querySelector('#lastmessage');
    if (lM) {
      lastMessage.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    } else {
      console.log(false);
    }
  };
  const messageLoader = useCallback(async (fn1, id) => {
    try {
      setLoading(true);
      const message = await getMessages(id);
      setLoading(false);
      if (!Array.isArray(message))
        return alert('could not get Message');
      fn1(message, id);
      setTimeout(() => {
        scrollToBottom();
      }, 400);
    } catch (e) {
      console.log(e);
    }
  }, []);
  // const messageRead = useCallback((arr, cb) => {}, []);

  useEffect(() => {
    updateSeen(selectedConversation.id, true);

    if (
      selectedConversation &&
      selectedConversation.messages &&
      !selectedConversation.messageLoaded &&
      selectedConversation.messages.length <= 0 &&
      selectedConversation.id
    ) {
      // console.log(selectedConversation.messageLoaded);
      messageLoader(loadMessages, selectedConversation.id);
    }

    if (
      selectedConversation &&
      selectedConversation.messages &&
      selectedConversation.messages.length > 1
    ) {
      setTimeout(() => {
        const lM = document.querySelector('#lastmessageb');
        if (lM) {
          scrollToBottom();
        } else {
          console.log(false);
        }
      }, 3000);
    }
    // if (selectedConversation.messages.some((x) => x.read === false)) {
    // }
    // check if there are unread messages
    // change the unread messages to read
    // messageRead();
    // eslint-disable-next-line
  }, [
    selectedConversation.id,
    selectedConversation,
    messageLoader,
    loadMessages,
    selectedConversation.messages,
    conversation.conversations,
    // conversation,
    // updateSeen,
    // state,
  ]);
  let messageList;
  if (messages && messages.length > 0) {
    messageList = messages.map((message, i) => {
      return (
        <div key={i}>
          {message.isListing && (
            <ListingChatBubble
              have={message.have}
              by={message.by}
              need={message.need}
              fromMe={message.isMyMessage}
            />
          )}
          <ChatBubble
            fromMe={message.isMyMessage}
            createdAt={message.createdAt}
          >
            {message.messageText}
          </ChatBubble>
        </div>
      );
    });
  } else if (loading) {
    messageList = (
      <div>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ScaleLoader loading={true} />;
        </div>
      </div>
    );
  } else if (!loading) {
    messageList = (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h3>This is the begining of this conversation</h3>
      </div>
    );
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
          {selectedConversation.title
            ? `${selectedConversation.title}`
            : ''}
        </span>
      </button>
    );
  };
  if (
    !selectedConversation ||
    selectedConversation === {} ||
    !selectedConversation.id
  ) {
    return <EmptyChatView />;
  }
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
          <div ref={lastMessage} id="lastmessage" />
        </Scrollbars>
      </main>
      <section className="message__view--input-container">
        <ChatInput
          onMessageSubmitted={onMessageSubmitted}
          user={selectedConversation.title}
          scrollToBottom={scrollToBottom}
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
  updateSeen: (convoId, seen) => dispatch(updateSeen(convoId, seen)),
  sortConversation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatMessageView);
