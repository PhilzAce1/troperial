import React from 'react';
import './VerifiedNotification.css';
import verifyIcon from '../../assets/images/troperial-verified.PNG'

const VerifiedNotification = ({onClick}) => {
    return (
        <div className="verified__container">
        <div>
        <img className="verifiedNotification__image" src={verifyIcon} alt="verify your account"/>
             <h2 className="verifiedNotification__title">Your Profile has been updated successfully</h2>
             <p className="verifiedNotification__p">Go on to post your first listing</p>
             <button className="verifiedNotification__btn" onClick={onClick}>Post a listing</button>
        </div>
        </div>
    )
}

export default VerifiedNotification
