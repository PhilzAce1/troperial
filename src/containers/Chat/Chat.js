import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateMessage as OnCreateMessage } from '../../libs/graphql';
// import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import ChatConversationList from './ChatConversationList/ChatConversationList';
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
}) => {
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
        const a = await createUser(user.username);
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
    // if (selectedConversation && selectedConversation.id) {
    const subscription = API.graphql(
      graphqlOperation(OnCreateMessage, {
        messageConversationId: selectedConversation.id,
      }),
    ).subscribe({
      next: (eventData) => {
        // const {
        //   id,
        //   authorId,
        //   content,
        //   messageConversationId,
        //   isListing,
        //   have,
        //   by,
        //   need,
        //   rate,
        //   createdAt,
        // } = eventData.value.data.onCreateMessage;
        // if (conversation.user.id === authorId)
        // newExternalMessage(
        //   messageConversationId,
        //   content,
        //   createdAt,
        //   isListing,
        //   authorId,
        //   by,
        //   have,
        //   need,
        //   rate,
        // );
      },
    });

    return () => subscription.unsubscribe();
  }, [
    conversation.user.id,
    getUserData,
    newExternalMessage,
    selectedConversation,
  ]);

  return (
    <React.Fragment>
      <NavBar page="Messages" icon="icon-messages" />
      <div className="chat-main-container">
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
            />
            <ChatUserProfile />
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
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
