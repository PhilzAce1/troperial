import data from '../containers/Chat/data';
let initialState = data;
initialState.selectedConversation = initialState.conversations[1];
initialState.currentUsername = 'philz';
export default function (state = initialState, action) {
  switch (action.type) {
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
        messageText: action.textMessage,
        createdAt: 'Apr 16',
        isMyMessage: true,
      });
      return newState;
    }
    default:
      return state;
  }
}
