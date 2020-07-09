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
  transaction = 'none',
) => ({
  type: 'LISTING_CHANGED',
  payload: {
    status,
    by,
    have,
    need,
    rate,
    transaction,
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
export const newExternalMessage = (messageReceived) => {
  return {
    type: 'NEW_EXTERNAL_MESSAGE',
    payload: messageReceived,
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
  id,
) => {
  return {
    type: 'UPDATE_MESSAGE_STACK',
    payload: {
      conversationId,
      stackNumber,
      createdAt,
      id,
    },
  };
};
export const sortConversation = (conversationId) => {
  return {
    type: 'SORT_CONVERSATION',
    payload: {
      conversationId,
    },
  };
};

export const updateSeen = (conversationId, toSeen = false) => {
  return {
    type: 'UPDATE_SEEN_MESSAGE',
    payload: { conversationId, toSeen },
  };
};
export const searchFilter = (input) => {
  return {
    type: 'SEARCH_FILTER',
    payload: {
      input,
    },
  };
};
export const clearFilter = () => ({
  type: 'CLEAR_SEARCH_FILTER',
});

export const addNewAccountDetails = (data) => (dispatch) => {
  dispatch({
    type: 'ACCONT_DETAILS_SENT',
    payload: data,
  });
};
