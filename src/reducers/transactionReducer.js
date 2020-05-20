import {
  GET_ALL_TRANSACTIONS,
  SET_LOADING,
  APPLY_FILTER,
  NOTIFY_USER
} from '../actions/types';
const initialState = {
  transactions: [],
  sortedTransactions: [],
  totalElements: null,
  totalPages: null,
  loading: false,
  notification: false
};
export default function (state = initialState, action) {
  switch (action.type) {
    case APPLY_FILTER: 
    return {
      ...state,
      sortedTransactions: action.payload
    }
    case NOTIFY_USER: 
    return {
      ...state,
      notification: action.payload
    }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case GET_ALL_TRANSACTIONS:
      const {
        transactionBatchResponseList,
        totalElements,
        totalPages,
        size,
      } = action.payload;
      console.log(action.payload);
      return {
        ...state,
        transactions: transactionBatchResponseList,
        sortedTransactions: transactionBatchResponseList,
        totalElements,
        totalPages,
        loading: false,
        listSize: size,
      };
    default:
      return state;
  }
}
