import {
  CREATE_USER,
  CHECK_USER_PROFILE,
  SET_USER_COGNITO_EMAIL,
  SET_CURRENT_USER_DETAILS,
  GET_ALL_ACCOUNTS,
} from '../actions/types';

const initialState = {
  currentUser: null,
  profileUpdated: null,
  userCognitoEmail: null,
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
  phoneNumber: '',
  verified: null,
  accountId: '',
  accounts: null,
  phoneId: '',
  emailId: '',
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case SET_CURRENT_USER_DETAILS:
      const {
        firstName,
        lastName,
        userAlias,
        number,
        verified,
        accountId,
        phoneId,
        emailId,
        personId,
      } = action.payload;
      return {
        ...state,
        firstName,
        lastName,
        userName: userAlias,
        phoneNumber: number,
        verified,
        accountId,
        phoneId,
        emailId,
        personId,
      };
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
        userCognitoEmail: action.payload,
      };
    default:
      return state;
  }
}
