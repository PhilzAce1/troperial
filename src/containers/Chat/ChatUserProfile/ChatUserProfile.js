import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import Avatar from 'react-avatar';

import updater from './helper';
import './ChatUserProfile.css';
import { updateUserProfile } from '../../../actions/conversationActions';
// import dp from '../../../assets/images/profile-picture.png';
// import { updateUserDetails } from '../../../actions/authActions';
const ChatUserProfile = ({
  username,
  tradeCount,
  updateUserProfile,
  userProfileDetails,
  selectedConversation,
}) => {
  const [loading, setLoading] = useState(false);
  async function getDetails() {
    if (
      selectedConversation &&
      selectedConversation.chatUserProfile &&
      selectedConversation.title &&
      !selectedConversation.chatUserProfile.userProfileLoaded
    ) {
      setLoading(true);
      await updater(
        { username: selectedConversation.title },
        updateUserProfile,
        selectedConversation.id,
      );
      setLoading(false);
    }
  }
  useEffect(() => {
    if (selectedConversation.id) {
      getDetails();
    }
    //eslint-disable-next-line
  }, [selectedConversation.id, selectedConversation.chatUserProfile]);

  if (
    selectedConversation &&
    selectedConversation.chatUserProfile &&
    !selectedConversation.chatUserProfile.userProfileLoaded &&
    loading
  ) {
    return (
      <section className="user__profile">
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          <div>
            <ScaleLoader />
          </div>
        </div>
      </section>
    );
  }

  if (
    selectedConversation &&
    selectedConversation.chatUserProfile &&
    selectedConversation.chatUserProfile.userProfileLoaded &&
    !loading &&
    selectedConversation.chatUserProfile.data === {}
  ) {
    return (
      <section className="user__profile">
        <div
          style={{
            height: '100%',
            width: '100%',
            position: 'relative',
          }}
        >
          <div style={{ padding: '30px' }}>
            <h1>Unable to Get This User's Data</h1>
            <span>
              This could be because the user does not have a valid id
            </span>
          </div>
        </div>
      </section>
    );
  }
  if (
    selectedConversation &&
    selectedConversation.chatUserProfile &&
    selectedConversation.chatUserProfile.userProfileLoaded
  ) {
    return (
      <section className="user__profile">
        {/* <img
          className="user__profile-temporary-dp"
          src={dp}
          alt="user dp"
        /> */}
        <div
          style={{
            borderRadius: '50%',
          }}
        >
          <Avatar
            round={true}
            name={`${selectedConversation.chatUserProfile.data.firstName} ${selectedConversation.chatUserProfile.data.lastName}`}
            size="150"
            email={selectedConversation.chatUserProfile.data.email}
          />
        </div>
        {selectedConversation.chatUserProfile &&
          selectedConversation.chatUserProfile.data &&
          selectedConversation.chatUserProfile.data.username && (
            <p className="user__profile-username">
              @{selectedConversation.chatUserProfile.data.username}
            </p>
          )}
        <p className="user__profile-trade-count">
          {tradeCount} successful trades
        </p>
        <button className="user__profile-trusted-trader-btn">
          Mark as trusted trader
        </button>

        <div className="user__profile-horizontal-line"></div>
        {/* <p className="user__profile-join-date">Joined 2 months ago</p> */}
        <button className="user__profile-report-btn">
          Report @{username}
        </button>
      </section>
    );
  }
  return <section className="user__profile"></section>;
};
ChatUserProfile.defaultProps = {
  username: 'username',
  tradeCount: 10,
};
const mapStateToProps = (state) => {
  return {
    userProfileDetails: state.conversation.chatUserProfile,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (data) => dispatch(updateUserProfile(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatUserProfile);
