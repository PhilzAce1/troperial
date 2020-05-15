import {
  GET_ALL_TRANSACTIONS,
  GET_MORE_TRANSACTIONS,
  SET_LOADING,
} from './types';
import axios from 'axios';
export const getTransactions = (page = 1) => async (dispatch) => {
  setLoading();
  try {
    const response = await axios.get(
      `https://transactions.api.troperial.com/transactions/paged?page=${page}&size=5`,
    );
    dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: response.data,
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

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
