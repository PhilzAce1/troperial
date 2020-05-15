import React, { Fragment } from 'react';
import './CustomAlert.css';
const Alert = ({ message, onClick }) => {
  return (
    <Fragment>
      {/* {showAlert ? ( */}
      <div className="customAlert__container">
        <div>
          <i className="customAlert__icon fas fa-exclamation-circle"></i>
          <p className="customAlert__message">{message}</p>
        </div>
        <div>
          <span onClick={onClick}>
            <i className="customAlert__cancel fas fa-times"></i>
          </span>
        </div>
      </div>
      {/* ): null} */}
    </Fragment>
  );
};

export default Alert;
