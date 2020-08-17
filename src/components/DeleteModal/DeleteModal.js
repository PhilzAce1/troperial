import React from 'react';
import './DeleteModal.css';
import img from '../../assets/images/troperial-delete.PNG';
import close from '../../assets/images/Close.png';
import {connect} from 'react-redux';
import { getMyTransactions, getTrustedTraders } from '../../actions/myTransactionActions';
import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
const DeleteModal = ({ handleClose, handleDelete, deleteTransactionId, getMyTransactions, accountId,personId, deleteTrustedTraders,  deleteTrustedTradersIds, getTrustedTraders}) => {
  const deleteTransaction = async (data) => {
    console.log(accountId, deleteTransactionId)
    const authToken = localStorage.getItem('authToken');;
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_TRANSACTIONS_API}/accounts/${accountId}/transactions/${deleteTransactionId}/unlist`, '', {
          headers: {
            Authorization: authToken,
          },
        });
      toast.success('Succesfully Unlisted!!')
      getMyTransactions();
      // handleClose()
    } catch(e) {
      console.log(e)
      toast.error('Please try again')
    }
  }
  const removeTrustedTrader = async () => {
    const authToken = localStorage.getItem('authToken');
    const {accountId: traderAccountId, personId: traderPersonId, userAlias} =  deleteTrustedTradersIds;
    try {
      const response = await axios.post(`${process.env.REACT_APP_TRANSACTIONS_API}/accounts/${traderAccountId}/traderprofile/${traderPersonId}/remove`, {
        traderPersonId,
        traderAccountId,
        traderPersonAlias:  userAlias,
      }, {
        headers: {
          Authorization: authToken,
        },
      });
      toast.success(`${userAlias} has been successfully removed`)
      getTrustedTraders(accountId, personId);
    } catch (e) {
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
          Are you sure you want to remove <strong>@{deleteTrustedTradersIds.userAlias}</strong> from your trusted traders?
        </p>
        <button className="delete__modal-btn" onClick={() => removeTrustedTrader()}>
          Yes, Remove <strong>@{deleteTrustedTradersIds.userAlias}</strong>
        </button>
        <button
          className="delete__modal-cancel-btn"
          onClick={handleClose}
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
          onClick={handleClose}
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
  deleteTrustedTradersIds: state.myTransaction.deleteTrustedTradersIds,
  accountId: state.auth.accountId,
  personId: state.auth.personId,

});
DeleteModal.defaultProps = {
  deleteTrustedTraders: false
}
export default connect(mapStateToProps, {getMyTransactions, getTrustedTraders})(DeleteModal);
