import {
  GET_ALL_TRANSACTIONS,
  GET_MORE_TRANSACTIONS,
  SET_LOADING,
  APPLY_FILTER,
  NOTIFY_USER,
  GET_ALL_RATES,
  CONFIRM_POST_LISTING
} from './types';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';
import { setStep } from './uiActions';
import { currency_symbols } from '../constants/currency_symbols';
import { getMyTransactions } from './myTransactionActions';

export const createTransaction = (data) => async (dispatch) => {

  const {
    sourceAmount,
    sourceCurrency,
    destinationAmount,
    destinationCurrency,
    preferredExchangeRate,
    privateListing,
    verified,
  } = data;
  console.log({ sourceAmount,
    sourceCurrency,
    destinationAmount,
    destinationCurrency,
    preferredExchangeRate,
    privateListing,
    verified})
  const authToken = localStorage.getItem('authToken');
    if (
      sourceAmount === '' ||
      preferredExchangeRate === '' 
    ) {
      return toast.error(
        'Please ensure that all fields are correctly filled',
      );
    }
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    let accountId = currentUserInfo.attributes['custom:accountId'];
    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_TRANSACTIONS_API}/accounts/${accountId}/transactions`,
        {
          verifiedPerson: verified,
          sourceAmount,
          sourceCurrency,
          destinationAmount,
          destinationCurrency,
          preferredExchangeRate,
          privateListing,
          personId: personId,
        },
        {
          headers: {
            Authorization: authToken,
          },
        },
      );
      console.log(response.data);
      dispatch(getMyTransactions())
      dispatch(setStep(CONFIRM_POST_LISTING))
      dispatch(setLoading(false));
    } catch (e) {
      e.response.data.message.includes(
        'User has exceeded max count (3) for unverified transaction listings',
      )
        ? toast.error(
            'Unverified accounts are limited to posting more than 3 listings, please verify your account to post more listings!',
          )
        : toast.error(
            `Please Verify your account to be able to post listings above ${currency_symbols[sourceCurrency]}1000`,
          );
      dispatch(setLoading(false));
    }
}

export const createUnAuthenticatedUserTransaction = (data, verified) => async (dispatch)=> {
  const authToken = localStorage.getItem('authToken');
      localStorage.removeItem('unAuthenticatedUserListing');
      const currentUserInfo = await Auth.currentUserInfo();
      let personId = currentUserInfo.attributes['custom:personId'];
      let accountId = currentUserInfo.attributes['custom:accountId'];
      console.log({
        ...data,
        personId,
        verifiedPerson: verified,
        accountId,
      });
      try {
        await axios.post(
          `${process.env.REACT_APP_TRANSACTIONS_API}/accounts/${accountId}/transactions`,
          { ...data, personId, verifiedPerson: verified },
          {
            headers: {
              Authorization: authToken,
            },
          },
        );
        dispatch(getMyTransactions)
        dispatch(setStep(CONFIRM_POST_LISTING));
      } catch (e) {
        e.response.data.message.includes(
          'User has exceeded max count (3) for unverified transaction listings',
        )
          ? toast.error(
              'Unverified accounts are limited to posting more than 3 listings, please verify your account to post more listings!',
            )
          : toast.error(
              `Please Verify your account to be able to post listings above ${currency_symbols[data.sourceCurrency]}1000`,
            );
        dispatch(setLoading(false));
      }
}
export const getAllRates = () => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TRANSACTIONS_API}/rates`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    const { data: rates } = response;
    dispatch({
      type: GET_ALL_RATES,
      payload: rates,
    });
    return rates;
  } catch (e) {
    console.log(e);
  }
};
export const applyFilter = (filtered) => async (dispatch) =>
  dispatch({ type: APPLY_FILTER, payload: filtered });

export const notifyUser = (message) => async (dispatch) =>
  dispatch({ type: NOTIFY_USER, payload: message });
export const getTransactions = (page = 1, size = 10) => async (
  dispatch,
) => {
  dispatch(setLoading(true));
  const authToken = localStorage.getItem('authToken');
  page = page - 1;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TRANSACTIONS_API}/transactions/paged?page=${page}&size=${size}`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    console.log(response)
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: { ...response.data },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getMoreTransactions = (page) => async (dispatch) => {
  const authToken = localStorage.getItem('authToken');
  page = page - 1;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TRANSACTIONS_API}/transactions/paged?page=${page}&size=5`,
      {
        headers: {
          Authorization: authToken,
        },
      },
    );
    dispatch({
      type: GET_MORE_TRANSACTIONS,
      payload: response.data,
    });
  } catch (e) {
    console.log(e);
  }
};
export const setLoading = (loading) => {
  return {
    type: SET_LOADING,
    payload: loading,
  };
};
