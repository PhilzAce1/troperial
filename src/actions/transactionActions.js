import {
  GET_ALL_TRANSACTIONS,
  GET_MORE_TRANSACTIONS,
  SET_LOADING,
  APPLY_FILTER,
  NOTIFY_USER,
  GET_ALL_RATES,
} from './types';
import axios from 'axios';

export const getAllRates = () => async (dispatch) => {
  try {
    const response = await axios.get(
      'https://transactions.api.troperial.com/rates',
    );
    const {data: rates} = response;
    dispatch({
      type: GET_ALL_RATES,
      payload: rates
    })
    return rates;
  } catch (e) {
    console.log(e);
  }
};
export const applyFilter = (filtered) => async (dispatch) =>
  dispatch({ type: APPLY_FILTER, payload: filtered });

export const notifyUser = (message) => async (dispatch) =>
  dispatch({ type: NOTIFY_USER, payload: message });
export const getTransactions = (page = 1, size = 5) => async (
  dispatch,
) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(
      `https://transactions.api.troperial.com/transactions/paged?page=${page}&size=${size}`,
    );
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: { ...response.data },
    });
  } catch (e) {
    console.log(e);
  }
};

export const getMoreTransactions = (page) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://transactions.api.troperial.com/transactions/paged?page=${page}&size=5`,
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
