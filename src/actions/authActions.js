import {
  CONFIRM_PROFILE_UPDATE,
  CHECK_USER_PROFILE,
  UPDATE_PROFILE,
  SET_USER_COGNITO_EMAIL,
  SET_CURRENT_USER_DETAILS,
} from './types';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { setStep } from './uiActions';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const createUser = (
  username,
  firstname,
  lastname,
  phone,
) => async (dispatch) => {
  const phoneDetails = parsePhoneNumberFromString(phone);
  console.log(firstname, lastname, username, phoneDetails);
  const userData = {
    userAlias: username,
    firstName: firstname,
    lastName: lastname,
    dateOfBirth: '1986-05-01',
    address: {
      type: 'HOME',
      addressLines: ['Flat 1100 Something Blvd', 'Apy 77889'],
      city: 'Harrison',
      state: 'NJ',
      country: 'USA',
      postalCode: '12345',
    },
    emailAddress: {
      email: 'a5508166-5444-416a-a55f-a7beff6936ac@yahoo.com',
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
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      'custom:personId': response.data.personId,
      'custom:userName': response.data.userAlias,
    });
    dispatch({
      type: CHECK_USER_PROFILE,
      payload: true,
    });
    dispatch(setStep(CONFIRM_PROFILE_UPDATE));
  } catch (e) {
    console.log(e);
  }
};
export const getUserDetails = () => async (dispatch) => {
  try {
    // get user personid from amplify
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    if (!personId) {
      return null;
    }
    const user = await axios.get(
      `https://persons.api.troperial.com/persons/${personId}`,
    );
    const {
      firstName,
      lastName,
      userAlias,
      phoneNumbers,
    } = user.data;
    const { number } = phoneNumbers[0];
    dispatch({
      type: SET_CURRENT_USER_DETAILS,
      payload: { firstName, lastName, userAlias, number },
    });
  } catch (e) {
    console.log(e)
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
      console.log('Users profile is updated');
    }
  } catch (err) {
    console.log('error fetching user info: ', err);
  }
};
export const updateUserDetails = (data) => async (dispatch) => {
  console.log(data);
  const { firstname, lastname } = data;
  try {
    const response = await axios.post(
      'https://persons.api.troperial.com/persons//name',
      {
        firstName: firstname,
        lastName: lastname,
      },
    );
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};
