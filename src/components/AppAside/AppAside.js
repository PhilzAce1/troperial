import React from 'react';
import './AppAside.css';
import verifyIcon from '../../assets/images/troperial-verified.PNG';
import mobileVerifyIcon from '../../assets/images/troperial-mobile-verified.PNG';
const AppAside = ({ onClick }) => {
  return (
    <aside className="listings__aside-container">
      <div className="listings__mobile-verified">
        <img src={mobileVerifyIcon} alt="verify your account" />
        <p>Verify your account</p>
      </div>
      <div className="listings__largeScreen-verified">
        <div>
          <img
            className="listings__aside--verify-image"
            src={verifyIcon}
            alt="verify your account"
          />
          <h2 className="listings__aside--verify-title">
            Verify your account
          </h2>
          <p className="listings__aside--verify-p">
            Verify your acccount to show your listings on the exchange
            floor instantly and increase your listing limit
          </p>
          <button
            className="listings__aside--verify-btn"
            onClick={onClick}
          >
            Verify Account
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AppAside;
