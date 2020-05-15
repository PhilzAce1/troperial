import { GET_ALL_TRANSACTIONS, SET_LOADING } from '../actions/types';
const initialState = {
  transactions: null,
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
