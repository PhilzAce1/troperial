import {
  CONFIRM_PROFILE_UPDATE,
  CHECK_USER_PROFILE,
  UPDATE_PROFILE,
  SET_USER_COGNITO_EMAIL,
  SET_CURRENT_USER_DETAILS,
  CREATE_TRANSACTION,
  GET_ALL_ACCOUNTS,
} from './types';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { setStep } from './uiActions';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { toast } from 'react-toastify';

export const createUser = (
  firstname,
  lastname,
  username,
  phone,
) => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  const phoneDetails = parsePhoneNumberFromString(phone);
  const currentUserInfo = await Auth.currentUserInfo();
  try {
    let { sub: cognitoUserId, email } = currentUserInfo.attributes;
    const userData = {
      cognitoUserId,
      userAlias: username,
      firstName: firstname,
      lastName: lastname,
      dateOfBirth: '1986-05-01',
      emailAddress: {
        email,
      },
      phoneNumber: {
        country: phoneDetails.country,
        number: phoneDetails.number,
        countryCode: `+${phoneDetails.countryCallingCode}`,
      },
    };
    console.log(userData)
      const response = await axios.post(
        'https://persons.api.troperial.com/persons',
        userData, {
          headers: {
            Authorization: authToken,
          },
        },
      );
      const {
        personId,
        firstName,
        lastName,
        userAlias,
        phoneNumbers,
        emailAddresses,
        verified,
        accountId,
      } = response.data;
      const { phoneId, number } = phoneNumbers[0];
      const { emailId } = emailAddresses[0];
      console.log(response.data, phoneId, emailId);
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        'custom:personId': personId,
        'custom:userName': userAlias,
        'custom:accountId': accountId,
      });
      dispatch({
        type: CHECK_USER_PROFILE,
        payload: true,
      });
      dispatch(setStep(CONFIRM_PROFILE_UPDATE));
      dispatch({
        type: SET_CURRENT_USER_DETAILS,
        payload: {
          firstName,
          lastName,
          userAlias,
          number,
          verified,
          accountId,
          phoneId,
          emailId,
        },
      });
      return false;
  } catch (e) {
    console.log(e);
    toast.error('Something wrong happened, please try again.')
    return false;
  }
};
const getUserDetails = (personId) => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const user = await axios.get(
      `https://persons.api.troperial.com/persons/${personId}`, {
      headers: {
        Authorization: authToken,
      },
    });
    const {
      firstName,
      lastName,
      userAlias,
      phoneNumbers,
      emailAddresses,
      verified,
      accountId,
    } = user.data;
    const { phoneId, number } = phoneNumbers[0];
    const { emailId } = emailAddresses[0];
    dispatch({
      type: SET_CURRENT_USER_DETAILS,
      payload: {
        firstName,
        lastName,
        userAlias,
        number,
        verified,
        accountId,
        phoneId,
        emailId,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
export const checkUserProfile = () => async (dispatch) => {
  try {
    const currentUserInfo = await Auth.currentUserInfo();
    dispatch({
      type: SET_USER_COGNITO_EMAIL,
      payload: currentUserInfo.attributes.email,
    });
    let personId = currentUserInfo.attributes['custom:personId'];

    if (!personId) {
      dispatch(setStep(UPDATE_PROFILE));
      dispatch({
        type: CHECK_USER_PROFILE,
        payload: false,
      });
    } else {
      dispatch({
        type: CHECK_USER_PROFILE,
        payload: true,
      });
      dispatch(setStep(CREATE_TRANSACTION));
      dispatch(getUserDetails(personId));
      console.log('Users profile is updated');
    }
  } catch (err) {
    console.log('error fetching user info: ', err);
  }
};

export const updateUserDetails = (data) => async (
  dispatch
) => {
  const authToken = localStorage.getItem('authToken');
  const { firstname, lastname, username, email, phone } = data;
  const phoneDetails = parsePhoneNumberFromString(phone);
  try {
      const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    const response = await axios.patch(
      `https://persons.api.troperial.com/persons/${personId}`,
      {
        newName: {
            firstName: firstname,
            lastName: lastname,
            userAlias: username
        },
        newEmail: {
            email,
        },
        newPhone: {
          country: phoneDetails.country,
          number: phoneDetails.number,
          countryCode: `+${phoneDetails.countryCallingCode}`,
        },
       },
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      'custom:userName': username,
    });
    dispatch(getUserDetails(personId));
    toast.success('Profile updated!')
    console.log(response)
  } catch (e) {
      console.log(e);
      toast.error('Please try again!')
  }
};

// Get Accounts
export const getAccount = (accountId) => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  let accountList = [];
  try {
    const response = await axios.get(
      `https://accounts.api.troperial.com/accounts/${accountId}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    if (!response.data.externalAccounts) {
      return dispatch({
        type: GET_ALL_ACCOUNTS,
        payload: [],
      });
    } else {
      const {
        ngnAccounts,
        usAccounts,
        ukAccounts,
        zelleAccounts,
        cashAppAccounts
      } = response.data.externalAccounts;
      if (Object.keys(response.data.externalAccounts).length === 0) {
        accountList = [];
      }
      if (ngnAccounts) {
        accountList = [...accountList, ...ngnAccounts];
      }
      if (usAccounts) {
        accountList = [...accountList, ...usAccounts];
      }
      if (ukAccounts) {
        accountList = [...accountList, ...ukAccounts];
      }
      if (zelleAccounts) {
        accountList = [...accountList, ...zelleAccounts];
      }
      if (cashAppAccounts) {
        accountList = [...accountList, ...cashAppAccounts];
      }

      dispatch({
        type: GET_ALL_ACCOUNTS,
        payload: accountList,
      });
    }
  } catch (e) {
    console.log(e);
  }
};
