import {  CONFIRM_PROFILE_UPDATE_FOR_CHAT} from '../actions/types';

const initialState = {
 profileUpdatedForChat: ''
};
export default function (state = initialState, action) {
  switch (action.type) {
    case  CONFIRM_PROFILE_UPDATE_FOR_CHAT: 
    return {
    ...state,
    profileUpdatedForChat: action.payload
    }
    default:
      return state;
  }
}
