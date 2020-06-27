import React, { useContext, useEffect, useCallback } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';

import { AppContext } from '../libs/contextLib';
import { getMessages } from '../libs/conversationHelpers';
import { pushNotification } from '../libs/pushNotification';
import { onCreateMessage as OnCreateMessage } from '../libs/graphql';
import {
  newExternalMessage,
  loadMessages,
} from '../actions/conversationActions';
import { findConvo } from '../containers/Chat/helpers';
function AuthenticatedRoute({
  children,
  conversation,
  newExternalMessage,
  loadMessages,
  ...rest
}) {
  const messageLoad = useCallback(
    async (convoId) => {
      console.log('what is going');
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
              // console.log(eventData);
              const {
                id,
                authorId,
                content,
                messageConversationId,
                isListing,
                have,
                by,
                need,
                rate,
                createdAt,
              } = eventData.value.data.onCreateMessage;
              const convers = findConvo(
                conversation.conversations,
                messageConversationId,
              );
              if (convers.convoExist) {
                // if (
                //   !convers.messageLoaded &&
                //   convers.convo.messages.length <= 0
                // ) {
                messageLoad(messageConversationId);
                // }
                pushNotification(content);
                newExternalMessage(
                  messageConversationId,
                  content,
                  createdAt,
                  isListing,
                  authorId,
                  id,
                  by,
                  have,
                  need,
                  rate,
                );
              }
            },
          });
          return () => subscription.unsubscribe();
        }
      });
    }
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
  newExternalMessage: (
    conversationId,
    textMessage,
    createdAt,
    isListing,
    authorId,
    id,
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
        id,
        by,
        have,
        need,
        rate,
      ),
    );
  },
  loadMessages: (message, conversationId) =>
    dispatch(loadMessages(message, conversationId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthenticatedRoute);
