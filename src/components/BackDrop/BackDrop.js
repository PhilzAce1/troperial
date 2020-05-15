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

const BackDrop = ({ handleBackDrop, step, setStep }) => {
  const renderView = (step) => {
    if (step === UPDATE_PROFILE) {
      return <UpdateProfile />;
    } else if (step === CONFIRM_PROFILE_UPDATE) {
      return (
        <VerifiedNotification
          onClick={() => setStep(CREATE_TRANSACTION)}
        />
      );
    } else {
      return <PostTrade />;
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
        {renderView(step)}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  step: state.ui.step,
});
export default connect(mapStateToProps, { setStep })(BackDrop);
