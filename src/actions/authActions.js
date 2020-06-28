import {
  CONFIRM_PROFILE_UPDATE,
  CHECK_USER_PROFILE,
  UPDATE_PROFILE,
  SET_USER_COGNITO_EMAIL,
  SET_CURRENT_USER_DETAILS,
  CREATE_TRANSACTION,
  GET_ALL_ACCOUNTS
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
        userData,
      );
      const {
        personId,
        firstName,
        lastName,
        userAlias,
        phoneNumbers,
        verified,
        accountId
      } = response.data;
      const { number } = phoneNumbers[0];
      console.log(response.data);
      // const account = await axios.post('https://persons.api.troperial.com/accounts', {
      //   personId: personId,
      //   accountType: "PERSONAL"
      // }, {
      //   headers: {
      //     Authorization: localStorage.getItem('authToken')
      //   }
      // })
      // console.log(account);
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        'custom:personId': personId,
        'custom:userName': userAlias,
        'custom:accountId': accountId
      });
      dispatch({
        type: CHECK_USER_PROFILE,
        payload: true,
      });
      dispatch(setStep(CONFIRM_PROFILE_UPDATE));
      dispatch({
        type: SET_CURRENT_USER_DETAILS,
        payload: { firstName, lastName, userAlias, number, verified, accountId},
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
  try {
    const user = await axios.get(
      `https://persons.api.troperial.com/persons/${personId}`,
    );
    const {
      firstName,
      lastName,
      userAlias,
      phoneNumbers,
      verified,
      accountId
    } = user.data;
    const { number } = phoneNumbers[0];
    dispatch({
      type: SET_CURRENT_USER_DETAILS,
      payload: { firstName, lastName, userAlias, number, verified, accountId },
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

export const updateUserDetails = (data) => async (dispatch) => {
  const { firstname, lastname, username } = data;
  const authToken = localStorage.getItem('authToken');
  try {
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    const response = await axios.patch(
      `https://persons.api.troperial.com/persons//name`,
      {
        firstName: firstname,
        lastName: lastname,
        userAlias: username
      },
      {
          headers: {
            Authorization: authToken
          }
        }
    );
    // const user = await Auth.currentAuthenticatedUser();
    // await Auth.updateUserAttributes(user, {
    //   'custom:userName': username,
    // });

    console.log(response)
  } catch (e) {
    console.log(e);
  }
};

export const getAccount = (accountId) => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  let accountList = [];
  console.log(accountId)
  try {
    const response = await axios.get(
      `https://accounts.api.troperial.com/accounts/${accountId}`,
      {
          headers: {
            Authorization: authToken
          }
        }
    );
    const {ngnAccounts, usAccounts, ukAccounts} = response.data.externalAccounts
    if(Object.keys(response.data.externalAccounts).length === 0) {
     accountList = [];
    } 
    if(ngnAccounts) {
      accountList = [...accountList, ...ngnAccounts];
    }
    if (usAccounts) {
      accountList = [...accountList, ...usAccounts];
    } 
    if(ukAccounts){
      accountList = [...accountList, ...ukAccounts]
    }
  
    //const externalAccounts
    dispatch({
      type: GET_ALL_ACCOUNTS,
      payload: accountList
    })
    console.log(accountList)
  } catch (e) {
    console.log(e);
  }
};
