import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
import conversationReducer from './conversationReducer';
import auxReducer from './auxReducer';
export default combineReducers({
  transaction: transactionReducer,
  auth: authReducer,
  ui: uiReducer,
  conversation: conversationReducer,
  auxState: auxReducer,
});
