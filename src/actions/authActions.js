import {
  CONFIRM_PROFILE_UPDATE,
  CHECK_USER_PROFILE,
  UPDATE_PROFILE,
  SET_USER_COGNITO_EMAIL,
  SET_CURRENT_USER_DETAILS,
  CREATE_TRANSACTION,
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
        verified
      } = response.data;
      const { number } = phoneNumbers[0];
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        'custom:personId': personId,
        'custom:userName': userAlias,
      });
      dispatch({
        type: CHECK_USER_PROFILE,
        payload: true,
      });
      dispatch(setStep(CONFIRM_PROFILE_UPDATE));
      dispatch({
        type: SET_CURRENT_USER_DETAILS,
        payload: { firstName, lastName, userAlias, number, verified },
      });
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
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
      verified
    } = user.data;
    const { number } = phoneNumbers[0];
    dispatch({
      type: SET_CURRENT_USER_DETAILS,
      payload: { firstName, lastName, userAlias, number, verified },
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
