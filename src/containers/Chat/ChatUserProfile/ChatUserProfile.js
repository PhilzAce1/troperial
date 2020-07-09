import React from 'react';
import './ChatUserProfile.css';
import dp from '../../../assets/images/profile-picture.png';
const ChatUserProfile = ({
  username,
  tradeCount,
  selectedConversation,
}) => {
  return (
    <section className="user__profile">
      <img
        className="user__profile-temporary-dp"
        src={dp}
        alt="user dp"
      />
      <p className="user__profile-username">@{username}</p>
      <p className="user__profile-trade-count">
        {tradeCount} successful trades
      </p>
      <button className="user__profile-trusted-trader-btn">
        Mark as trusted trader
      </button>

      <div className="user__profile-horizontal-line"></div>
      <p className="user__profile-join-date">Joined 2 months ago</p>
      <button className="user__profile-report-btn">
        Report @{username}
      </button>
    </section>
  );
};
ChatUserProfile.defaultProps = {
  username: 'username',
  tradeCount: 10,
};
export default ChatUserProfile;
