import {
    SET_LOADING,
    APPLY_MY_FILTER,
    NOTIFY_USER,
    GET_MY_TRANSACTIONS,
    SET_USER_TOTAL_LISTING,
    SET_EDIT_TRANSACTION,
    SET_DELETE_TRANSACTION_ID
  } from './types';
  import axios from 'axios';
  import { toast } from 'react-toastify';
  import { Auth } from 'aws-amplify';
  
  export const applyFilter = (filtered) => async (dispatch) =>
    dispatch({ type: APPLY_MY_FILTER, payload: filtered });
  
  export const notifyUser = (message) => async (dispatch) =>
    dispatch({ type: NOTIFY_USER, payload: message });
  export const getMyTransactions = () => async (
    dispatch,
  ) => {
    dispatch(setLoading(true));
     const authToken = localStorage.getItem('authToken');
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      let accountId = currentUserInfo.attributes['custom:accountId'];
      const response = await axios.get(
        `https://transactions.api.troperial.com/accounts/${accountId}/transactions`,
      {
        headers: {
          Authorization: authToken,
        },
      });
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
   export const setEditTransaction = (data) => (dispatch) => {
     dispatch({
       type: SET_EDIT_TRANSACTION,
       payload: data
     })
   }
   export const setDeleteTransactionId = (data) => (dispatch) => {
     dispatch({
       type: SET_DELETE_TRANSACTION_ID,
       payload: data
     })
   }

   export const deleteTransaction = (data) => {
      
   }

  export const editMyTransaction = (data) => async (dispatch) => {
    const authToken = localStorage.getItem('authToken');
    const {accountId, transactionId, sourceAmount, destinationAmount, prefferedRate} = data;
    try {
      const response = await axios.patch(
        `https://transactions.api.troperial.com/accounts/${accountId}/transactions/${transactionId}`,
        {
          sourceAmount,
          destinationAmount,
          prefferedExchangeRate: prefferedRate
        },
      {
        headers: {
          Authorization: authToken,
        },
      });
      console.log(response);

      toast.success('Your listing has been successfully updated!!')
     dispatch(getMyTransactions());
      console.log(data)
    } catch(e) {
      console.log(e)
      toast.error('Oops, please try again!')
    }

  }
  export const setLoading = (loading) => {
    return {
      type: SET_LOADING,
      payload: loading,
    };
  };
  