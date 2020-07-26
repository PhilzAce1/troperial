import React from 'react';
import './CloseTrade.css';
import close from '../../assets/images/Close.png';
import greenCheck from '../../assets/svgs/update-status.svg';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { listingChanged } from '../../actions/conversationActions';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
import axios from 'axios';
import {Auth} from 'aws-amplify';
const CloseTrade = ({ handleCloseTrade, user, listingChanged, transaction}) => {
   const handleClick = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      console.log(transaction)
      const currentUserInfo = await Auth.currentUserInfo();
      let accountId = currentUserInfo.attributes['custom:accountId'];
        const response = await axios.patch(`https://transactions.api.troperial.com/accounts/${accountId}/transactions/${transaction.transactionId}/close`,{
          completedByAccountId: transaction.accountId,
          finalExchangeRate: 350.0,
          completedByPersonId: transaction.personId,
          completedByTransactionId: transaction.transactionId
        }, {
          headers: {
            Authorization: authToken,
          },
        })
        console.log(response, transaction)
        toast.success('Transaction Completed!')
        listingChanged('clear');
        handleCloseTrade();
    }catch(e) {
      console.log(e)
      toast.error('Oops, please try again, something wrong happened')
    }
 
    
  }
  return (
    <div className="closeTrade_modal-bg">
     
      <div className="closeTrade-modal">
        <div className="closeBtn_container">
          <button
            className="closeTrade_close"
            onClick={handleCloseTrade}
          >
            <img src={close} alt="bin" />
          </button>
        </div>
        <ToastContainer/>
        <section className="update_listing_status">
          <p className="title">Update listing status</p>
          <img src={greenCheck} alt="green check" />
          <p className="message">
            Have you successfully exchanged currencies with @{user}
          </p>
          <CustomButton loading={false} onClickHandler={handleClick}>
            Yes, Mark Trade as complete
          </CustomButton>
          <button className="close" onClick={handleCloseTrade}>
            No exchange was carried out
          </button>
        </section>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.conversation.selectedConversation.title,
  transaction: state.conversation.selectedConversation.listing.transaction
});
const mapDispatchToProps = (dispatch) => {
  return {
    listingChanged: (status) => dispatch(listingChanged(status)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CloseTrade);
