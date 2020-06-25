import {
    SET_LOADING,
    APPLY_MY_FILTER,
    NOTIFY_USER,
    GET_MY_TRANSACTIONS,
    SET_USER_TOTAL_LISTING
  } from './types';
  import axios from 'axios';
  import { Auth } from 'aws-amplify';
  
  export const applyFilter = (filtered) => async (dispatch) =>
    dispatch({ type: APPLY_MY_FILTER, payload: filtered });
  
  export const notifyUser = (message) => async (dispatch) =>
    dispatch({ type: NOTIFY_USER, payload: message });
  export const getMyTransactions = () => async (
    dispatch,
  ) => {
    dispatch(setLoading(true));
    const currentUserInfo = await Auth.currentUserInfo();
    let personId = currentUserInfo.attributes['custom:personId'];
    try {
      const response = await axios.get(
        `https://transactions.api.troperial.com/accounts/${personId}/transactions`,
      );

      console.log(response.data.lenght);
      dispatch({
      type:SET_USER_TOTAL_LISTING,
      payload: response.data.length
      })
      dispatch({
        type: GET_MY_TRANSACTIONS,
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
  