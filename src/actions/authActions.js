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
      userAlias: username.toLowerCase(),
      firstName: firstname.toLowerCase(),
      lastName: lastname.toLowerCase(),
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
    try {
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
      return false;
    }
  } catch (e) {
    console.log(e);
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
  const { firstname, lastname, username, email, phone } = data;

  try {
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    updateNames(firstname, lastname, username, personId);
    dispatch(updateEmail(email, personId));
    dispatch(updatePhone(phone, personId));
    dispatch(getUserDetails(personId))
  } catch (e) {
    console.log(e);
  }
};

const updateNames = async (
  firstname,
  lastname,
  username,
  personId,
) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.patch(
      `https://persons.api.troperial.com/persons/${personId}/name`,
      {
        firstName: firstname,
        lastName: lastname,
        userAlias: username,
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

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};
const updatePhone = (phone, personId) => async (
  dispatch,
  getState,
) => {
  const authToken = localStorage.getItem('authToken');
  const { phoneId } = getState().auth;
  console.log(phoneId);
  const phoneDetails = parsePhoneNumberFromString(phone);
  const { country, number, countryCallingCode } = phoneDetails;
  try {
    const response = await axios.patch(
      `https://persons.api.troperial.com/persons/${personId}/phoneNumbers/${phoneId}`,
      {
        country,
        number,
        countryCode: countryCallingCode,
      },
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

const updateEmail = (email, personId) => async (
  dispatch,
  getState,
) => {
  const authToken = localStorage.getItem('authToken');
  const { emailId } = getState().auth;
  try {
    const response = await axios.patch(
      `https://persons.api.troperial.com/persons/${personId}/emailAddresses/${emailId}`,
      {
        email,
      },
      {
        headers: {
          Authorization: authToken,
        },
      },
    );

    console.log(response);
  } catch (e) {
    console.log(e);
  }
};
// Get Accounts
export const getAccount = (accountId) => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  let accountList = [];
  console.log(accountId);
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
      console.log(response.data.externalAccounts)
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
