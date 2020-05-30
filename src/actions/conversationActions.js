export const conversationChanged = (conversationId) => ({
  type: 'SELECTED_CONVERSATION_CHANGED',
  conversationId,
});
export const conversationDeleted = () => ({
  type: 'DELETE_CONVERSATION',
});
export const newMessageAdded = (textMessage) => ({
  type: 'NEW_MESSAGE_ADDED',
  textMessage,
});
export const getMessage = (conversationId) => async (dispatch) => {};
export const createUser = () => async (dispatch) => {};
export const createConversation = () => async (dispatch) => {};
export const newConversationFromListing = (data) => (dispatch) => {
  // check if user exist : create user
  // check if conversation with user exist : createConversation
  // change the Selected Conversation
  // change listing details
};
