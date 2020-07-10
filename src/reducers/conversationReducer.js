import data from '../containers/Chat/data';
import { removeStack, filterDup } from '../containers/Chat/helpers';
let initialState = data;
let State = {
  user: {},
  conversations: [],
  selectedConversation: {
    stack: [],
    id: '',
    messageLoaded: false,
    messages: [],
    lastMessage: '',
  },
  listing: {},
  search: [],
  conversationLength: 0,
  chatUserProfile: {
    userProfileLoaded: false,
    personId: '',
  },
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
      if (action.payload.items.length <= 0) return newState;
      newState.conversations = [];
      // if (!action.payload.items || action.payload.username) {

      //   return newState;
      // }
      action.payload.items.forEach((conversation) => {
        const userTitle = conversation.conversation.members
          .filter(
            (user) =>
              user.toLowerCase() !==
              action.payload.username.toLowerCase(),
          )
          .join('');
        return newState.conversations.push({
          id: conversation.conversation.id,
          title: userTitle,
          messageLoaded: false,
          messages: [],
          stack: [],
          lastMessage: {},
          chatUserProfile: {
            userProfileLoaded: false,
            personId: '',
          },
        });
      });
      const filteredConvo = filterDup(
        newState.conversations,
        (it) => it.id,
      );
      newState.conversations = filteredConvo;
      newState.selectedConversation = newState.conversations[0];
      newState.conversationLength = newState.conversations.length;
      return newState;
    }
    case 'LOAD_NEW_MESSAGES': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;
      if (convo.messageLoaded) {
        convo.lastMessage = convo.messages[convo.messages.length - 1];
        return newState;
      }
      convo.messageLoaded = true;
      convo.messages = [];
      if (action.payload.messages.length < 0) return newState;
      action.payload.messages.forEach((message) => {
        convo.messages.push({
          id: message.id,
          isListing: message.isListing,
          isAccountDetail: message.isAccountDetail,
          accountNumber: message.accountNumber,
          bvnNumber: message.bvnNumber,
          currency: message.currency,
          customerAccountNumber: message.customerAccountNumber,
          externalAccountSubType: message.externalAccountSubType,
          primaryBank: message.primaryBank,
          routingNumber: message.routingNumber,
          seen: message.seen !== null ? message.seen : true,
          sortCode: message.sortCode,
          updatedAt: message.updatedAt,
          userId: message.userId,
          zelleEmail: message.zelleEmail,
          authorId: message.authorId,
          accountName: message.accountName,
          by: message.by,
          have: message.have,
          rate: message.rate,
          need: message.need,
          imageAlt: null,
          messageText: message.content,
          read: message.seen !== null ? message.seen : true,
          createdAt: message.createdAt,
          isMyMessage: message.authorId === newState.user.id,
        });
      });
      convo.lastMessage = convo.messages[convo.messages.length - 1];
      return newState;
    }
    case 'SELECTED_CONVERSATION_CHANGED': {
      const newState = { ...state };
      newState.listing = {
        open: false,
        by: 'none',
        have: 'none',
        rate: 'none',
        need: 'none',
      };
      const filteredConvo = filterDup(
        newState.conversations,
        (it) => it.id,
      );
      newState.conversations = filteredConvo;
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
        transaction: action.payload.transaction,
      };

      return newState;
    }
    case 'NEW_EXTERNAL_MESSAGE': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.messageConversationId,
      );

      if (!convo) return newState;
      if (action.payload.authorId === newState.user.id)
        return newState;

      const msgExist = convo.messages.find((x) => {
        return x.id === action.payload.id;
      });
      if (msgExist) {
        return newState;
      }
      console.log(convo.messages.length, action.payload);
      convo.messages.push({
        id: action.payload.id,
        isListing: action.payload.isListing,
        isAccountDetail: action.payload.isAccountDetail,
        accountNumber: action.payload.accountNumber
          ? action.payload.accountNumber
          : 'none',
        bvnNumber: action.payload.bvnNumber
          ? action.payload.bvnNumber
          : 'none',
        primaryBank: action.payload.primaryBank
          ? action.payload.primaryBank
          : 'none',
        customerAccountNumber: action.payload.customerAccountNumber
          ? action.payload.customerAccountNumber
          : 'none',
        sortCode: action.payload.sortCode
          ? action.payload.sortCode
          : 'none',
        routingNumber: action.payload.routingNumber
          ? action.payload.routingNumber
          : 'none',
        externalAccountSubType: action.payload.externalAccountSubType
          ? action.payload.externalAccountSubType
          : 'none',
        zelleEmail: action.payload.zelleEmail
          ? action.payload.zelleEmail
          : 'none',
        userId: action.payload.userId
          ? action.payload.userId
          : 'none',
        currency: action.payload.currency
          ? action.payload.currency
          : 'none',
        accountName: action.payload.accountName
          ? action.payload.accountName
          : 'none',
        seen: action.payload.seen,
        by: action.payload.by,
        have: action.payload.have,
        rate: action.payload.rate,
        need: action.payload.need,
        messageText: action.payload.content,
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
        chatUserProfile: {
          userProfileLoaded: false,
          personId: '',
        },
      });
      newState.conversationLength = newState.conversations.length;

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
        isListing: action.payload.isListing,
        by: action.payload.by,
        have: action.payload.have,
        rate: action.payload.rate,
        need: action.payload.need,
        messageText: action.payload.textMessage,
        isMyMessage: true,
        isSending: true,
        stackId: action.payload.stackNumber,
        createdAt: 1591904532746,
      });

      convo.lastMessage = convo.messages[convo.messages.length - 1];

      return newState;
    }
    case 'UPDATE_MESSAGE_STACK': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.conversationId,
      );
      if (!convo) return newState;
      const pendingMessage = convo.messages.find(
        (message) => message.stackId === action.payload.stackNumber,
      );
      pendingMessage.createdAt = action.payload.createdAt;
      pendingMessage.id = action.payload.id;

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
      if (convo.messages.length <= 0) return newState;
      const unSeenMessages = convo.messages.filter((message) => {
        return message.read === false;
      });
      unSeenMessages.forEach((message) => {
        return (message.read = true);
      });
      return newState;
    }
    case 'SORT_CONVERSATION': {
      const newState = { ...state };
      const sortedConvo = [...newState.conversations].sort((a, b) => {
        var dateA =
          a.lastMessage && a.lastMessage.createdAt
            ? Math.floor(a.lastMessage.createdAt)
            : 1591904532746;
        var dateB =
          b.lastMessage && b.lastMessage.createdAt
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
      return newState;
    }
    case 'CLEAR_SEARCH_FILTER': {
      const newState = { ...state };
      newState.search = [];
      return newState;
    }

    case 'ACCONT_DETAILS_SENT': {
      const newState = { ...state };
      newState.selectedConversation = {
        ...newState.selectedConversation,
      };
      newState.selectedConversation.messages.push({
        isAccountDetail: true,
        createdAt: Date.now(),
        isMyMessage: true,
        accountNumber: action.payload.accountNumber
          ? action.payload.accountNumber
          : 'none',
        bvnNumber: action.payload.bvnNumber
          ? action.payload.bvnNumber
          : 'none',
        primaryBank: action.payload.primaryBank
          ? action.payload.primaryBank
          : 'none',
        customerAccountNumber: action.payload.customerAccountNumber
          ? action.payload.customerAccountNumber
          : 'none',
        sortCode: action.payload.sortCode
          ? action.payload.sortCode
          : 'none',
        routingNumber: action.payload.routingNumber
          ? action.payload.routingNumber
          : 'none',
        externalAccountSubType: action.payload.externalAccountSubType
          ? action.payload.externalAccountSubType
          : 'none',
        zelleEmail: action.payload.zelleEmail
          ? action.payload.zelleEmail
          : 'none',
        userId: action.payload.userId
          ? action.payload.userId
          : 'none',
        currency: action.payload.currency
          ? action.payload.currency
          : 'none',
        accountName: action.payload.accountName
          ? action.payload.accountName
          : 'none',
        // fromMe: '200',
      });
      return newState;
    }
    case 'UPDATE_MESSAGE_SEEN': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) =>
          conversation.id === action.payload.messageConversationId,
      );
      if (!convo) return newState;
      const messageThatWasSeen = convo.messages.find(
        (message) => message.id === action.payload.id,
      );
      if (messageThatWasSeen) {
        messageThatWasSeen.seen = true;
      }
      return newState;
    }
    case 'UPDATE_USER_PROFILE': {
      const newState = { ...state };
      const convo = newState.conversations.find(
        (conversation) => conversation.id === action.payload.convoId,
      );
      if (!convo) return newState;
      convo.chatUserProfile.userProfileLoaded = true;
      convo.chatUserProfile.data = action.payload;
      return newState;
    }
    default:
      return state;
  }
}
