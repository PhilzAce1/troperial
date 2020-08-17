import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import './ChatMessageView.css';
import ChatInput from '../ChatInput/ChatInput';
// import dp from '../../../assets/images/profile-picture.png';
import { Scrollbars } from 'react-custom-scrollbars';
import ChatBubble from '../../../components/ChatBubble/ChatBubble';
import ScrollToBottom from 'react-scroll-to-bottom';
import { connect } from 'react-redux';
import {
  getMessages,
  updateMessageSeen,
} from '../../../libs/conversationHelpers';
import Avatar from 'react-avatar';
// import ListingCard from '../../../components/ListingCard';
import ListingChatBubble from '../../../components/ListingChatBubble/ListingChatBubble';
import ScaleLoader from 'react-spinners/ScaleLoader';
import EmptyChatView from '../../../components/EmptyChatView/EmptyChatView';
import BankAccountChatBubble from '../../../components/BankAccountChatBubble/BankAccountChatBubble';
import { markAsSeen } from '../helpers';
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
  handleBankAccountList,
  handleCloseTrade,
}) => {
  const lastMessage = useRef(null);
  const [loading, setLoading] = useState(false);
  const scrollToBottom = () => {
    const lM = document.querySelector('#lastmessage');
    if (lM) {
      return lastMessage.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      });
    } else {
      return;
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
    if (
      selectedConversation &&
      selectedConversation.messages &&
      selectedConversation.messageLoaded
    ) {
      markAsSeen(selectedConversation, updateMessageSeen, updateSeen);
    }
    // updateSeen(selectedConversation.id, true);

    if (
      selectedConversation &&
      selectedConversation.messages &&
      !selectedConversation.messageLoaded &&
      selectedConversation.messages.length <= 0 &&
      selectedConversation.id
    ) {
      messageLoader(loadMessages, selectedConversation.id);
    }

    if (
      selectedConversation &&
      selectedConversation.messages &&
      selectedConversation.messages.length > 1
    ) {
      setTimeout(() => {
        const lastMessageRef = document.querySelector('#lastmessage');
        if (lastMessageRef) {
          return scrollToBottom();
        } else {
          return;
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, [
    selectedConversation.id,
    selectedConversation,
    messageLoader,
    loadMessages,
    selectedConversation.messages.length,
    conversation.conversations,
  ]);
  let messageList;
  if (messages && messages.length > 0) {
    messageList = messages.map((message, i) => {
      return (
        <div key={i}>
          {message.isListing && (
            <ListingChatBubble
              preferredExchangeRate={message.rate}
              have={message.have}
              by={message.by}
              need={message.need}
              fromMe={message.isMyMessage}
            />
          )}
          {message.isAccountDetail && (
            <BankAccountChatBubble
              accountNumber={
                message.accountNumber === 'none' ||
                !message.accountNumber
                  ? null
                  : message.accountNumber
              }
              bvnNumber={
                message.bvnNumber === 'none' || !message.bvnNumber
                  ? null
                  : message.bvnNumber
              }
              primaryBank={
                message.primaryBank === 'none' || !message.primaryBank
                  ? null
                  : message.primaryBank
              }
              customerAccountNumber={
                message.customerAccountNumber === 'none' ||
                !message.customerAccountNumber
                  ? null
                  : message.customerAccountNumber
              }
              sortCode={
                message.sortCode === 'none' || !message.sortCode
                  ? null
                  : message.sortCode
              }
              routingNumber={
                message.routingNumber === 'none' ||
                !message.routingNumber
                  ? null
                  : message.routingNumber
              }
              externalAccountSubType={
                message.externalAccountSubType === 'none' ||
                !message.externalAccountSubType
                  ? null
                  : message.externalAccountSubType
              }
              zelleEmail={
                message.zelleEmail === 'none' || !message.zelleEmail
                  ? null
                  : message.zelleEmail
              }
              phoneNumber={
                message.phoneNumber === 'none' || !message.phoneNumber
                  ? null
                  : message.phoneNumber
              }
              // userId={xyz === 'none' || xyz.length < 0 ? null : xyz}
              currency={
                message.currency === 'none' || !message.currency
                  ? null
                  : message.currency
              }
              phoneNumber={
                message.phoneNumber === 'none' || !message.phoneNumber
                  ? null
                  : message.phoneNumber
              }
              accountName={
                message.accountName === 'none' || !message.accountName
                  ? null
                  : message.accountName
              }
              userId={
                message.userId === 'none' || !message.userId
                  ? null
                  : message.userId
              }
              fromMe={message.isMyMessage}
            />
          )}

          {message.messageText && message.messageText !== 'none' && (
            <ChatBubble
              fromMe={message.isMyMessage}
              createdAt={message.createdAt}
            >
              {message.messageText}
            </ChatBubble>
          )}
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
          <ScaleLoader size={100} color={'#0383ef'} loading={true} />
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
  let userAvatar;

  if (
    selectedConversation &&
    selectedConversation.chatUserProfile &&
    selectedConversation.chatUserProfile.userProfileLoaded &&
    selectedConversation.chatUserProfile.data
  ) {
    userAvatar = (
      <Avatar
        name={`${selectedConversation.chatUserProfile.data.firstName} ${selectedConversation.chatUserProfile.data.lastName}`}
        size="32"
        email={selectedConversation.chatUserProfile.data.email}
        round={true}
      />
    );
  }
  if (
    selectedConversation &&
    selectedConversation.chatUserProfile &&
    !selectedConversation.chatUserProfile.userProfileLoaded &&
    selectedConversation.title
  ) {
    userAvatar = (
      <Avatar
        name={`${selectedConversation.title}`}
        size="32"
        round={true}
      />
    );
  }
  const userheaderTitle = () => {
    return (
      <button className="user__header-title">
        {userAvatar}
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
  // const xyz = '200';
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
          handleBankAccountList={handleBankAccountList}
          handleCloseTrade={handleCloseTrade}
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
