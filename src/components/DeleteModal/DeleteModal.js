import React from 'react';
import './DeleteModal.css';
import img from '../../assets/images/troperial-delete.PNG';
import close from '../../assets/images/Close.png';
import {connect} from 'react-redux';
import { getMyTransactions } from '../../actions/myTransactionActions';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
const DeleteModal = ({ handleClose, handleDelete, deleteTransactionId, getMyTransactions, accountId, deleteTrustedTraders}) => {
  const deleteTransaction = async (data) => {
    console.log(accountId, deleteTransactionId)
    const authToken = localStorage.getItem('authToken');;
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_TRANSACTIONS_API}/accounts/${accountId}/transactions/${deleteTransactionId}/unlist`, {
        headers: {
          Authorization: authToken,
        },
      });
      console.log(response);

      toast.success('Succesfully Unlisted!!')
      getMyTransactions();
      handleClose()
      console.log(data)
    handleClose();
    } catch(e) {
      console.log(e)
      toast.error('Please try again')
    }
  }
  return (
    <div className="delete__modal-container">
      <ToastContainer/>
     {
       deleteTrustedTraders ? (
        <div className="delete__modal">
        <img
          onClick={handleClose}
          className="delete__modal-icon"
          src={close}
          alt="close"
        />
        <p className="delete__modal-title">Remove Trusted Trader</p>
        <img className="bin" src={img} alt="delete" />
        <p className="delete__modal-confirm-message">
          Are you sure you want to remove this user from your trusted traders?
        </p>
        <button className="delete__modal-btn" onClick={() => deleteTransaction(deleteTransactionId)}>
          Yes, Remove this user
        </button>
        <button
          className="delete__modal-cancel-btn"
          onClick={handleDelete}
        >
          Cancel
        </button>
      </div>
       ) : (
        <div className="delete__modal">
        <img
          onClick={handleClose}
          className="delete__modal-icon"
          src={close}
          alt="close"
        />
        <p className="delete__modal-title">Delete a listing</p>
        <img className="bin" src={img} alt="delete" />
        <p className="delete__modal-confirm-message">
          Are you sure you want to delete this listing?
        </p>
        <button className="delete__modal-btn" onClick={() => deleteTransaction(deleteTransactionId)}>
          Yes, Delete this listing
        </button>
        <button
          className="delete__modal-cancel-btn"
          onClick={handleDelete}
        >
          Cancel
        </button>
      </div>
       )
     }
    </div>
  );
};

const mapStateToProps = (state) => ({
  deleteTransactionId: state.myTransaction.deleteTransactionId,
  accountId: state.auth.accountId
});
DeleteModal.defaultProps = {
  deleteTrustedTraders: false
}
export default connect(mapStateToProps, {getMyTransactions})(DeleteModal);
