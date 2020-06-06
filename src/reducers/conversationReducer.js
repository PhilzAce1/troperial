import data from '../containers/Chat/data';
import { actionIcon } from 'aws-amplify';
import { removeStack } from '../containers/Chat/helpers';
let initialState = data;
let State = {
  user: {},
  conversations: [],
  selectedConversation: {
    stack: [],
  },
  listing: {},
};
initialState.selectedConversation = initialState.conversations[1];
export default function (state = State, action) {
  switch (action.type) {
    case 'SET_USER_DETAILS': {
      const newState = { ...state };
      newState.user.id = action.payload.userId;
      newState.user.username = action.payload.username;
      return newState;
    }
    case 'SET_USER_CONVERSATIONS': {
      const newState = { ...state };
      if (action.payload.items.length < 1) return newState;
      newState.conversations = [];
      action.payload.items.forEach((conversation) => {
        return newState.conversations.push({
          id: conversation.conversation.id,
          title: conversation.conversation.members
            .filter((user) => user !== action.payload.username)
            .join(''),
          messages: [],
          stack: [],
        });
      });
      return newState;
    }
    case 'LOAD_NEW_MESSAGES': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;
      action.payload.messages.forEach((message) => {
        convo.messages.push({
          isListing: message.isListing,
          authorId: message.authorId,
          by: message.by,
          have: message.have,
          rate: message.rate,
          need: message.need,
          imageAlt: null,
          messageText: message.content,
          createdAt: message.createAt,
          isMyMessage: message.authorId === newState.user.id,
        });
      });
      return newState;
    }
    case 'SELECTED_CONVERSATION_CHANGED': {
      const newState = { ...state };
      newState.selectedConversation = newState.conversations.find(
        (conversation) => conversation.id === action.conversationId,
      );
      return newState;
    }
    case 'NEW_MESSAGE_ADDED': {
      const newState = { ...state };
      newState.selectedConversation = {
        ...newState.selectedConversation,
      };
      newState.selectedConversation.messages.push({
        imageUrl: null,
        imageAlt: null,
        isListing: action.payload.isListing,
        by: action.payload.by,
        have: action.payload.have,
        rate: action.payload.rate,
        need: action.payload.need,
        messageText: action.payload.textMessage,
        createdAt: 'Apr 16',
        isMyMessage: true,
      });
      return newState;
    }
    case 'LISTING_CHANGED': {
      const newState = { ...state };
      newState.listing = {
        open: action.payload.status,
        by: action.payload.by,
        have: action.payload.have,
        need: action.payload.need,
        rate: action.payload.rate,
      };

      return newState;
    }
    case 'NEW_EXTERNAL_MESSAGE': {
      const newState = { ...state };

      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;
      convo.messages.push({
        imageUrl: null,
        imageAlt: null,
        isListing: action.payload.isListing,
        by: action.payload.by,
        have: action.payload.have,
        rate: action.payload.rate,
        need: action.payload.need,
        messageText: action.payload.textMessage,
        createdAt: action.payload.createAt,
        isMyMessage: action.payload.authorId === newState.user.id,
      });
      return newState;
    }
    case 'NEW_CONVERSATION': {
      const newState = { ...state };
      newState.conversations.push({
        id: action.payload.id,
        title: action.payload.members,
        messages: [],
        stack: [],
      });
      return newState;
    }

    case 'NEW_CURRENT_USER_MESSAGE': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;

      convo.stack.push(action.payload.stackNumber);
      convo.messages.push({
        imageUrl: null,
        imageAlt: null,
        isListing: action.payload.isListing,
        by: action.payload.by,
        have: action.payload.have,
        rate: action.payload.rate,
        need: action.payload.need,

        messageText: action.payload.textMessage,
        isMyMessage: true,
        isSending: true,
        stackId: action.payload.stackNumber,
      });

      return newState;
    }
    case 'UPDATE_MESSAGE_STACK': {
      const newState = { ...state };

      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;
      // update Message
      const pendingMessage = convo.messages.find(
        (message) => message.stackId === action.payload.stackNumber,
      );
      pendingMessage.createdAt = action.payload.createAt;

      delete pendingMessage.isSending;
      delete pendingMessage.stackId;

      convo.stack = removeStack(
        convo.stack,
        action.payload.stackNumber,
      );
      return newState;
    }
    default:
      return state;
  }
}
