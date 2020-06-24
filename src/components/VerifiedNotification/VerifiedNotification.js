import React from 'react';
import './VerifiedNotification.css';
import verifyIcon from '../../assets/images/troperial-verified.PNG'

const VerifiedNotification = ({onClick, message, btnMessage, title}) => {
    return (
        <div className="verified__container">
        <div>
        <img className="verifiedNotification__image" src={verifyIcon} alt="verify your account"/>
    <h2 className="verifiedNotification__title">{title}</h2>
    <p className="verifiedNotification__p">{message}</p>
    <button className="verifiedNotification__btn" onClick={onClick}>{btnMessage}</button>
        </div>
        </div>
    )
}

VerifiedNotification.defaultProps = {
    message: "Your Profile has been updated successfully",
    btnMessage: "Post a listing",
    title: 'Your Profile has been updated successfully'
}
export default VerifiedNotification
