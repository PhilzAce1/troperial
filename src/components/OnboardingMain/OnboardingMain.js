import React from 'react';
import './OnboardingMain.css';

const OnboardingMain = ({ children }) => {
  return (
    <main className="onboardingContainer__main">
      <div className="onboardingContainer__main--header">
        {children}
      </div>
    </main>
  );
};

export default OnboardingMain;
