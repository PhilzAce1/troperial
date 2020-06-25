import {
    GET_MY_TRANSACTIONS,
    SET_LOADING,
    APPLY_MY_FILTER,
    NOTIFY_USER,
    SET_USER_TOTAL_LISTING
  } from '../actions/types';
  const initialState = {
    myTransactions: [],
    mySortedTransactions: [],
    notification: false,
    totalListingsPosted: 0
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case APPLY_MY_FILTER:
        return {
          ...state,
          mySortedTransactions: action.payload,
        };
      case SET_USER_TOTAL_LISTING:
        return {
          ...state,
          totalListingsPosted: action.payload,
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
  