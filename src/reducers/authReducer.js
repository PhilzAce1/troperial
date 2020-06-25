import { CREATE_USER, CHECK_USER_PROFILE, SET_USER_COGNITO_EMAIL, SET_CURRENT_USER_DETAILS } from '../actions/types';

const initialState = {
  currentUser: null,
  profileUpdated: null,
  userCognitoEmail: null,
  firstName: '',
  lastName: '',
  userName:'',
  password:'',
  phoneNumber:'',
  verified: null
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_DETAILS: 
    const {firstName, lastName, userAlias, number, verified} = action.payload;
    return {
      ...state,
      firstName,
      lastName,
      userName: userAlias,
      phoneNumber: number,
      verified
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
