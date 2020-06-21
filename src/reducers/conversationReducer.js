import data from '../containers/Chat/data';
import { removeStack } from '../containers/Chat/helpers';
let initialState = data;
let State = {
  user: {},
  conversations: [],
  selectedConversation: {
    stack: [],
  },
  listing: {},
  search: [],
};
if (initialState.conversations.length > 0) {
  initialState.selectedConversation = initialState.conversations[1];
}
export default function (state = State, action) {
  switch (action.type) {
    case 'SET_USER_DETAILS': {
      const newState = { ...state };
      if (action.payload.userId && action.payload.username) {
        newState.user.id = action.payload.userId;
        newState.user.username = action.payload.username;
      }
      return newState;
    }
    case 'SET_USER_CONVERSATIONS': {
      const newState = { ...state };
      if (action.payload.items.length < 0) return newState;

      newState.conversations = [];
      action.payload.items.forEach((conversation) => {
        return newState.conversations.push({
          id: conversation.conversation.id,
          title: conversation.conversation.members
            .filter((user) => user !== action.payload.username)
            .join(''),
          messages: [],
          stack: [],
          lastMessage: {},
        });
      });
      newState.selectedConversation = newState.conversations[0];
      return newState;
    }
    case 'LOAD_NEW_MESSAGES': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );

      if (!convo) return newState;
      if (action.payload.messages.length < 0) return newState;
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
          read: true,
          createdAt: message.createdAt,
          isMyMessage: message.authorId === newState.user.id,
        });
      });
      convo.lastMessage = convo.messages[convo.messages.length - 1];
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
      if (action.payload.authorId === newState.user.id)
        return newState;
      convo.messages.push({
        imageUrl: null,
        imageAlt: null,
        isListing: action.payload.isListing,
        by: action.payload.by,
        have: action.payload.have,
        rate: action.payload.rate,
        need: action.payload.need,
        messageText: action.payload.textMessage,
        createdAt: action.payload.createdAt,
        read: false,
        isMyMessage: false,
      });
      convo.lastMessage = convo.messages[convo.messages.length - 1];

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

      convo.lastMessage = convo.messages[convo.messages.length - 1];

      return newState;
    }
    case 'UPDATE_MESSAGE_STACK': {
      console.log('UPDATE_MESSAGE_STACK', action.payload);
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
      pendingMessage.createdAt = action.payload.createdAt;

      delete pendingMessage.isSending;
      delete pendingMessage.stackId;

      convo.stack = removeStack(
        convo.stack,
        action.payload.stackNumber,
      );
      convo.lastMessage = convo.messages[convo.messages.length - 1];

      return newState;
    }
    case 'UPDATE_SEEN_MESSAGE': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;
      const unSeenMessages = convo.filter((message) => {
        if (message && message.hasOwnProperty('read'))
          return message.read === false;
        return true;
      });
      console.log(unSeenMessages);
      unSeenMessages.forEach((message) => {
        return (message.read = true);
      });
      return newState;
    }
    case 'SORT_CONVERSATION': {
      const newState = { ...state };
      const sortedConvo = [...newState.conversations].sort((a, b) => {
        var dateA =
          !a.lastMessage || a.lastMessage.createdAt !== undefined
            ? Math.floor(a.lastMessage.createdAt)
            : 1591904532746;
        var dateB =
          !a.lastMessage || b.lastMessage.createdAt !== undefined
            ? Math.floor(b.lastMessage.createdAt)
            : 1591904532746;
        return dateB - dateA;
      });
      newState.conversations = sortedConvo;
      return newState;
    }
    case 'SEARCH_FILTER': {
      const newState = { ...state };
      const regex = new RegExp(`^${action.payload.input}`, 'gi');
      const filteredConvo = [...newState.conversations].filter(
        (a) => {
          return regex.test(a.title);
        },
      );
      newState.search = filteredConvo;
      if (
        !action.payload.input ||
        (action.payload.input && action.payload.input.length < 0)
      ) {
        newState.search = [];
      }
      console.log(newState.search);
      return newState;
    }
    case 'CLEAR_SEARCH_FILTER': {
      const newState = { ...state };
      newState.search = [];
      return newState;
    }
    default:
      return state;
  }
}
