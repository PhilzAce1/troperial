import {
  CREATE_USER,
  CONFIRM_PROFILE_UPDATE,
  CHECK_USER_PROFILE,
  UPDATE_PROFILE,
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
    const result = await Auth.updateUserAttributes(user, {
      'custom:personId': response.data.personId,
      'custom:firstName': response.data.firstName,
      'custom:lastName': response.data.lastName,
      'custom:userName': response.data.userAlias,
      //  'custom:phoneNumber': response.data.phoneNumbers[0].number
    });
    console.log('result', result);
    dispatch({
      type: CHECK_USER_PROFILE,
      payload: true,
    });
    dispatch(setStep(CONFIRM_PROFILE_UPDATE));
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};

export const checkUserProfile = () => async (dispatch) => {
  try {
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = parseInt(
      currentUserInfo.attributes['custom:personId'],
    );
    if (!personId) {
      console.log('update profile');
      dispatch(setStep(UPDATE_PROFILE));
      dispatch({
        type: CHECK_USER_PROFILE,
        payload: false,
      });
    } else {
      console.log('personId', personId);
    }
  } catch (err) {
    console.log('error fetching user info: ', err);
  }
};
