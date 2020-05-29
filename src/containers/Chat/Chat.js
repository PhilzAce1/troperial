import React from 'react';
import { connect } from 'react-redux';

// import { API, graphqlOperation } from 'aws-amplify';

import ChatConversationList from './ChatConversationList/ChatConversationList';
import ChatMessageView from './ChatMessageView/ChatMessageView';
import ChatUserProfile from './ChatUserProfile/ChatUserProfile';
import {
  conversationChanged,
  newMessageAdded,
} from '../../actions/conversationActions';
import './Chat.css';

import NavBar from '../../components/NavBar/NavBar';
const Chat = ({
  conversations,
  selectedConversation,
  conversationChanged,
  onMessageSubmitted,
}) => {
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
    conversations: state.conversation.conversations,
    selectedConversation: state.conversation.selectedConversation,
  };
};
const mapDispatchToProps = (dispatch) => ({
  conversationChanged: (conversationId) =>
    dispatch(conversationChanged(conversationId)),
  onMessageSubmitted: (messageText) => {
    dispatch(newMessageAdded(messageText));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
