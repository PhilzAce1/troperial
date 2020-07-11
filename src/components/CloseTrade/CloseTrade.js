import React from 'react';
import './CloseTrade.css';
import close from '../../assets/images/Close.png';
import greenCheck from '../../assets/svgs/update-status.svg';

import { listingChanged } from '../../actions/conversationActions';
import { connect } from 'react-redux';
import CustomButton from '../CustomButton/CustomButton';
const CloseTrade = ({ handleCloseTrade, user, listingChanged }) => {
  function handleClick() {
    listingChanged('clear');
    return handleCloseTrade();
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
