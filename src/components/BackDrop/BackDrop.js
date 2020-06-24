import React from 'react';
import './BackDrop.css';
import VerifiedNotification from '../VerifiedNotification/VerifiedNotification';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import PostTrade from '../PostTrade/PostTrade';
import { connect } from 'react-redux';
import { setStep } from '../../actions/uiActions';
import {
  CREATE_TRANSACTION,
  UPDATE_PROFILE,
  CONFIRM_PROFILE_UPDATE,
} from '../../actions/types';
import AddBankAccount from '../../containers/AddBankAccout/AddBankAccount';

const BackDrop = ({
  handleBackDrop,
  step,
  setStep,
  renderBankAccoutForm,
}) => {
  const renderView = (step) => {
    if (step === UPDATE_PROFILE) {
      return <UpdateProfile />;
    } else if (localStorage.getItem('unAuthenticatedUserListing')){
      return <PostTrade />;
    }
    else if (step === CONFIRM_PROFILE_UPDATE) {
      return <VerifiedNotification message="You can now proceed to start a conversation from your prefered listing or click the button to Post A Listing" btnMessage="Post A Listing" onClick={() => setStep(CREATE_TRANSACTION)} />
    } else if (step === CREATE_TRANSACTION) {
      return <PostTrade />;
    } else {
      return null;
    }
  };
  return (
    <div className="backdrop">
      <div
        className="backdrop__background"
        onClick={handleBackDrop}
      ></div>
      <div className="backdrop__content-container">
        <div className="mobile__close-btn-container">
          <button onClick={handleBackDrop}>
            <i className="fas fa-times-circle"></i>
          </button>
        </div>
        <div>
          {renderBankAccoutForm === true ? (
            <AddBankAccount />
          ) : (
            renderView(step)
          )}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  step: state.ui.step,
});

BackDrop.defaultProps = {
  renderBankAccoutForm: false,
};
export default connect(mapStateToProps, { setStep })(BackDrop);
