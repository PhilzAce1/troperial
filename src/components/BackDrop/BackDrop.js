import React, {useEffect} from 'react';
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
  CONFIRM_POST_LISTING,
} from '../../actions/types';
import AddBankAccount from '../../containers/AddBankAccout/AddBankAccount';

const BackDrop = ({
  handleBackDrop,
  step,
  setStep,
  renderBankAccoutForm,
  verified,
}) => {

  useEffect(()=> {
    if(localStorage.getItem('unAuthenticatedUserListing')) {
      if(verified === null) {
        setStep(UPDATE_PROFILE)
      } else {
        setStep(CREATE_TRANSACTION)
      }
    }
  }, [setStep, verified])
  const renderView = (step) => {
    if (step === UPDATE_PROFILE) {
      return <UpdateProfile />;
    } else if (step === CONFIRM_PROFILE_UPDATE) {
      return <VerifiedNotification message="You can now proceed to start a conversation from your preferred listing or click the button to Post A Listing" btnMessage="Post A Listing" onClick={() => setStep(CREATE_TRANSACTION)} />
    } else if (step === CREATE_TRANSACTION) {
      return <PostTrade handleBackDrop={handleBackDrop}/>;
    } else if(step === CONFIRM_POST_LISTING) {
      return <VerifiedNotification title="Your Listing was successfully Posted" message="You can now proceed to start a conversation from your preferred listing or click the button to Post another Listing" btnMessage="Post A Listing" onClick={() => setStep(CREATE_TRANSACTION)}/>
    } else {
      return <h1>loading</h1>;
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
  verified: state.auth.verified,
});

BackDrop.defaultProps = {
  renderBankAccoutForm: false,
};
export default connect(mapStateToProps, { setStep })(BackDrop);
