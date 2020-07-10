import React, { useContext, useEffect, useCallback } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { AppContext } from '../libs/contextLib';
import { getMessages } from '../libs/conversationHelpers';
import { pushNotification } from '../libs/pushNotification';
import {
  onCreateMessage as OnCreateMessage,
  onUpdateMessage as OnUpdateMessage,
  // onCreateConvoLink,
} from '../libs/graphql';
import {
  newExternalMessage,
  loadMessages,
  updateMessageSeen,
} from '../actions/conversationActions';
import { findConvo } from '../containers/Chat/helpers';
function AuthenticatedRoute({
  children,
  conversation,
  newExternalMessage,
  loadMessages,
  updateMessageSeen,
  ...rest
}) {
  const messageLoad = useCallback(
    async (convoId) => {
      try {
        const message = await getMessages(convoId);
        if (!Array.isArray(message))
          return console.log('could not get Message');
        loadMessages(message, convoId);
      } catch (e) {
        console.log(e);
      }
    },
    [loadMessages],
  );

  useEffect(() => {
    if (
      conversation &&
      conversation.conversations.length > 0 &&
      conversation.selectedConversation &&
      conversation.selectedConversation.id !== ''
    ) {
      return conversation.conversations.forEach((x) => {
        if (x && x.id) {
          const subscription = API.graphql(
            graphqlOperation(OnCreateMessage, {
              messageConversationId: x.id,
            }),
          ).subscribe({
            next: (eventData) => {
              const {
                onCreateMessage: messageReceived,
              } = eventData.value.data;
              const convers = findConvo(
                conversation.conversations,
                messageReceived.messageConversationId,
              );
              if (convers.convoExist) {
                // if (
                //   !convers.messageLoaded &&
                //   convers.convo.messages.length <= 0
                // ) {
                messageLoad(messageReceived.messageConversationId);
                // }\
                if (
                  conversation.user.id !== messageReceived.authorId
                ) {
                  pushNotification(messageReceived.content);
                }
                newExternalMessage(messageReceived);
              }
            },
          });
          const updateMsgSub = API.graphql(
            graphqlOperation(OnUpdateMessage),
          ).subscribe({
            next: (eventData) => {
              const {
                value: {
                  data: {
                    onUpdateMessage: { id, messageConversationId },
                  },
                },
              } = eventData;
              updateMessageSeen({ id, messageConversationId });
            },
          });

          return () => {
            subscription.unsubscribe();
            updateMsgSub.unsubscribe();
          };
        }
      });
    }
    // if (conversation.user && conversation.user.id) {
    //   const subscription = API.graphql(
    //     graphqlOperation(onCreateConvoLink, {
    //       convoLinkUserId: conversation.user.id,
    //     }),
    //   ).subscribe({
    //     next: (eventData) => {
    //       console.log(eventData);
    //     },
    //   });
    //   return () => subscription.unsubscribe();
    // }
    // eslint-disable-next-line
  }, [
    newExternalMessage,
    conversation.conversations.length,
    messageLoad,
  ]);
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Route {...rest}>
      {isAuthenticated === true ? (
        children
      ) : (
        <Redirect to={`/signin?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}

const mapStateToProps = (state) => ({
  conversation: state.conversation,
});
const mapDispatchToProps = (dispatch) => ({
  newExternalMessage: (data) => {
    dispatch(newExternalMessage(data));
  },
  loadMessages: (message, conversationId) =>
    dispatch(loadMessages(message, conversationId)),
  updateMessageSeen: (data) => dispatch(updateMessageSeen(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute);
