import React, {
  useEffect,
  useCallback,
  Fragment,
  useState,
} from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ChatConversationList from './ChatConversationList/ChatConversationList';
import {ToastContainer} from 'react-toastify'
import ChatMessageView from './ChatMessageView/ChatMessageView';
import ChatUserProfile from './ChatUserProfile/ChatUserProfile';
import {
  conversationChanged,
  newMessageAdded,
  newExternalMessage,
  userDetails,
  userConversations,
} from '../../actions/conversationActions';
import { createUser } from '../../libs/conversationHelpers';
import './Chat.css';

import NavBar from '../../components/NavBar/NavBar';
import BankAccountList from '../BankAccountList/BankAccountList';
import CloseTrade from '../../components/CloseTrade/CloseTrade';
const Chat = ({
  conversations,
  selectedConversation,
  conversationChanged,
  onMessageSubmitted,
  newExternalMessage,
  conversation,
  userDetails,
  userConversations,
  user,
  state,
}) => {
  const [showBankAccountList, setShowBankAccountList] = useState(
    false,
  );
  const [showCloseTrade, setShowCloseTrade] = useState(false);
  const getUserData = useCallback(async () => {
    // user.username = 'runo';
    try {
      if (!user || !user.username || user.username === '') {
        const authUsername = await Auth.currentAuthenticatedUser();
        if (authUsername.attributes['custom:userName']) {
          user.username = authUsername.attributes['custom:userName'];
        } else {
          alert('PLEASE UPDATE YOUR PROFILE NOW !!!');
        }
      }
    } catch (e) {
      console.log(e);
    }
    // check if the username is empty
    if (
      conversation.user.username === undefined ||
      conversation.user.username === '' ||
      conversation.user === {} ||
      conversation.user.id === undefined ||
      conversation.conversations.length < 1
    ) {
      try {
        // create a user for the chat MS
        const a = await createUser(user.username, user.personId);
        if (a.success) {
          let {
            payload: {
              id,
              username,
              conversations: { items: conversations },
            },
          } = a;
          userDetails(id, username);
          return setTimeout(
            () => userConversations(conversations, user.username),
            1500,
          );
        } else {
          return console.log(
            "couldn't get create the user or user do not exist",
          );
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [
    conversation.conversations.length,
    conversation.user,
    user,
    userConversations,
    userDetails,
  ]);
  useEffect(() => {
    getUserData();
  }, [
    conversation.user.id,
    getUserData,
    newExternalMessage,
    selectedConversation,
  ]);

  const handleBankAccountList = () =>
    setShowBankAccountList(!showBankAccountList);

  const handleCloseTrade = () => {
    setShowCloseTrade(!showCloseTrade);
  };

  return (
    <Fragment>
      <ToastContainer/>
      <NavBar page="Messages" icon="icon-messages" />
      {showBankAccountList ? (
        <BankAccountList
          handleBankAccountList={handleBankAccountList}
        />
      ) : null}
      {showCloseTrade ? (
        <CloseTrade handleCloseTrade={handleCloseTrade} />
      ) : null}
      <div className="chat-main-container">
        {/* Preloader */}
        {!conversation.conversationLoaded && (
          <div
            style={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ScaleLoader
              size={150}
              color={'#0383ef'}
              loading={true}
            />
          </div>
        )}
        {/* End of Preloader */}
        <section className="chat__container">
          <div className="chat-grid-container">
            <ChatConversationList
              onConversationItemSelected={conversationChanged}
              conversations={conversations}
              selectedConversationId={selectedConversation.id}
            />
            <ChatMessageView
              messages={selectedConversation.messages}
              selectedConversation={selectedConversation}
              onMessageSubmitted={onMessageSubmitted}
              handleBankAccountList={handleBankAccountList}
              handleCloseTrade={handleCloseTrade}
            />
            <ChatUserProfile
              selectedConversation={selectedConversation}
            />
          </div>
        </section>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    state,
    conversation: state.conversation,
    conversations: state.conversation.conversations,
    user: state.auth,
    selectedConversation: state.conversation.selectedConversation,
  };
};
const mapDispatchToProps = (dispatch) => ({
  userConversations: (items, username) =>
    dispatch(userConversations(items, username)),
  userDetails: (userId, username) =>
    dispatch(userDetails(userId, username)),
  conversationChanged: (conversationId) =>
    dispatch(conversationChanged(conversationId)),
  onMessageSubmitted: (messageText) => {
    dispatch(newMessageAdded(messageText));
  },
  newExternalMessage: (
    conversationId,
    textMessage,
    createdAt,
    isListing,
    authorId,
    by,
    have,
    need,
    rate,
  ) => {
    dispatch(
      newExternalMessage(
        conversationId,
        textMessage,
        createdAt,
        isListing,
        authorId,
        by,
        have,
        need,
        rate,
      ),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
