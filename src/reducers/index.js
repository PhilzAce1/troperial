import { combineReducers } from 'redux';
import transactionReducer from './transactionReducer';
import authReducer from './authReducer';
import uiReducer from './uiReducer';
export default combineReducers({
  transaction: transactionReducer,
  auth: authReducer,
  ui: uiReducer,
});
