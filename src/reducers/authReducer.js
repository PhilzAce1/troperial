import { CREATE_USER, CHECK_USER_PROFILE } from '../actions/types';

const initialState = {
  currentUser: null,
  profileUpdated: true,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case CHECK_USER_PROFILE:
      return {
        ...state,
        profileUpdated: action.payload,
      };
    default:
      return state;
  }
}
