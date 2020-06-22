import {
    GET_MY_TRANSACTIONS,
    SET_LOADING,
    APPLY_MY_FILTER,
    NOTIFY_USER,
  } from '../actions/types';
  const initialState = {
    myTransactions: [],
    mySortedTransactions: [],
    notification: false,
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case APPLY_MY_FILTER:
        return {
          ...state,
          mySortedTransactions: action.payload,
        };
      case NOTIFY_USER:
        return {
          ...state,
          notification: action.payload,
        };
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case GET_MY_TRANSACTIONS:

        return {
          ...state,
          myTransactions: action.payload,
          mySortedTransactions: action.payload,
          loading: false,
        };
      default:
        return state;
    }
  }
  