import { CREATE_USER, CHECK_USER_PROFILE, SET_USER_COGNITO_EMAIL, SET_CURRENT_USER_DETAILS } from '../actions/types';

const initialState = {
  currentUser: null,
  profileUpdated: true,
  userCognitoEmail: null,
  firstName: '',
  lastName: '',
  userName:'',
  password:'',
  phoneNumber:'',
  userVerified: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_DETAILS: 
    const {firstName, lastName, userAlias, number} = action.payload;
    return {
      ...state,
      firstName,
      lastName,
      userName: userAlias,
      phoneNumber: number
    }
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
      case SET_USER_COGNITO_EMAIL: 
      return {
        ...state,
        userCognitoEmail: action.payload 
      }
    default:
      return state;
  }
}
