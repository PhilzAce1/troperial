import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer';
import myTransactionReducer from './myTransactionReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import conversationReducer from './conversationReducer';
export default combineReducers({
  transaction: transactionReducer,
  myTransaction: myTransactionReducer,
  auth: authReducer,
  ui: uiReducer,
  conversation: conversationReducer,
});
