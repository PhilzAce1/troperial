import React from 'react';
import './OnboardingNotification.css';

const OnboardingNotification = ({
  notificationIcon,
  title,
  message,
  children,
}) => {
  return (
    <div className="onboardingNotification_container">
      <img src={notificationIcon} alt="notification" />
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
};

export default OnboardingNotification;
