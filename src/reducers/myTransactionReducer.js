import {
    GET_MY_TRANSACTIONS,
    SET_LOADING,
    APPLY_MY_FILTER,
    NOTIFY_USER,
    SET_USER_TOTAL_LISTING,
    SET_EDIT_TRANSACTION,
    SET_DELETE_TRANSACTION_ID,
    SET_DELETE_TRUSTED_TRADER_ID ,
    GET_TRUSTED_TRADERS,
    SET_LOADING_TRUSTED_TRADERS
  } from '../actions/types';
  const initialState = {
    deleteTransactionId:'',
    myTransactions: [],
    mySortedTransactions: [],
    notification: false,
    totalListingsPosted: 0,
    sourceAmount: '',
    sourceCurrency: '',
    destinationAmount: '',
    destinationCurrency:'',
    transactionId:'',
    personId:'',
    accountId:'',
    preferredExchangeRate: '',
    privateListing: false,
    deleteTrustedTradersIds: {},
    trustedTraders: [],
    loadingTrustedTraders: false
  };
  export default function (state = initialState, action) {
    switch (action.type) {
      case SET_EDIT_TRANSACTION:
        const {sourceAmount, sourceCurrency, destinationAmount, destinationCurrency,transactionId, personId, accountId,  preferredExchangeRate, privateListing} = action.payload;
        return {
          ...state,
          sourceAmount,
          sourceCurrency,
          destinationCurrency,
          destinationAmount,
          transactionId, 
          personId,
          accountId,
          preferredExchangeRate,
          privateListing
        }
      case SET_DELETE_TRANSACTION_ID:
        return {
          ...state,
          deleteTransactionId: action.payload,
        };
      case GET_TRUSTED_TRADERS:
        return {
          ...state,
          trustedTraders: action.payload,
        };
      case SET_LOADING_TRUSTED_TRADERS:
        return {
          ...state,
          loadingTrustedTraders: action.payload 
        };
      case SET_DELETE_TRUSTED_TRADER_ID :
        return {
          ...state,
          deleteTrustedTradersIds: action.payload,
        };
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
  