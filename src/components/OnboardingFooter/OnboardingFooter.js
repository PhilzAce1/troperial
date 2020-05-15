import React from 'react';
import './OnboardingFooter.css';
const OnboardingFooter = ({ children }) => {
  return (
    <div className="onboarding__footer">
      {children}
      <p className="onboarding__footer-paragraph">
        By clicking "next", you agree to our{' '}
        <a href="##">Terms and Conditons</a> and{' '}
        <a href="##">Privacy Policy</a>
      </p>
    </div>
  );
};

export default OnboardingFooter;
