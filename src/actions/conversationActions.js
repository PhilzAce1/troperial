export const userDetails = (userId, username) => ({
  type: 'SET_USER_DETAILS',
  payload: {
    userId,
    username,
  },
});
export const userConversations = (items = [], username) => ({
  type: 'SET_USER_CONVERSATIONS',
  payload: { items, username },
});
export const conversationChanged = (conversationId) => ({
  type: 'SELECTED_CONVERSATION_CHANGED',
  conversationId,
});
export const listingChanged = (
  status = true,
  by = 'none',
  have = 'none',
  need = 'none',
  rate = 'none',
) => ({
  type: 'LISTING_CHANGED',
  payload: {
    status,
    by,
    have,
    need,
    rate,
  },
});
export const newConversation = (id, members) => ({
  type: 'NEW_CONVERSATION',
  payload: {
    id,
    members,
  },
});
export const loadMessages = (messages, conversationId) => {
  return {
    type: 'LOAD_NEW_MESSAGES',
    payload: { messages, conversationId },
  };
};
export const conversationDeleted = () => ({
  type: 'DELETE_CONVERSATION',
});
export const newMessageAdded = (textMessage) => ({
  type: 'NEW_MESSAGE_ADDED',
  payload: { textMessage },
});
export const newExternalMessage = (
  conversationId,
  textMessage,
  createdAt,
  isListing = false,
  authorId,
  by = 'none',
  have = 'none',
  need = 'none',
  rate = 'none',
) => {
  return {
    type: 'NEW_EXTERNAL_MESSAGE',
    payload: {
      createdAt,
      isListing,
      conversationId,
      textMessage,
      by,
      have,
      need,
      rate,
      authorId,
    },
  };
};

export const currentUserMessage = (
  conversationId,
  textMessage,
  stackNumber,
  isListing = false,
  authorId,
  by = 'none',
  have = 'none',
  need = 'none',
  rate = 'none',
) => ({
  type: 'NEW_CURRENT_USER_MESSAGE',
  payload: {
    stackNumber,
    isListing,
    conversationId,
    textMessage,
    by,
    have,
    need,
    rate,
    authorId,
  },
});
export const updateMessageStack = (
  conversationId,
  stackNumber,
  createdAt,
) => {
  return {
    type: 'UPDATE_MESSAGE_STACK',
    payload: {
      conversationId,
      stackNumber,
      createdAt,
    },
  };
};
