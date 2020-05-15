import React from 'react';
import img from '../../assets/images/money-bag.png';
import troperialLogo from '../../assets/images/Logo.png';
import './OnboardingAside.css';

const OnboardingAside = ({ illustration }) => {
  return (
    <aside className="onboardingContainer__aside">
      <div className="onboardingContainer__aside-top">
        <img
          className="onboardingContainer__troperialLogo"
          src={troperialLogo}
          alt="troperial logo"
        />
        <h3 className="intro">
          Exchange money <img className="moneyBag" src={img} alt="money-bag" />,<br />
          no matter where you are.
        </h3>
      </div>
      <div className="onboardingContainer__aside-bottom">
        <img src={illustration} alt="troperial-illustration" />
      </div>
    </aside>
  );
};

export default OnboardingAside;
