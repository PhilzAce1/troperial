import React from 'react';
import './Notification.css';

const Notification = () => {
  return (
    <div className="notification__container">
      <div className="notification__info-section">
        <p className="notification__title">
          <span className="notification__mobile-icon">
            <i className="fas fa-check-circle"></i>
          </span>
          Your listing has been approved
        </p>
        <div className="notification__text">
          <p className="notification__message">
            Your listing made on Wed 29th, 2020 has been approved.
            Verify your account to show your listings instantly
          </p>
          <button className="notification__normal-btn">
            View Listing
          </button>
          <button className="notification__danger-btn">
            View Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
