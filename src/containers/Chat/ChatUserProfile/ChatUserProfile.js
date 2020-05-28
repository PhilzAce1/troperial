import React from 'react'
import './ChatUserProfile.css';
import dp from '../../../assets/images/profile-picture.png';
const ChatUserProfile = () => {
    return (
        <section className="user__profile">
            <img className="user__profile-temporary-dp" src={dp} alt="display picture"/>
            <p className="user__profile-username">@runo</p>
            <p className="user__profile-trade-count">15 successful trades</p>
            <button className="user__profile-trusted-trader-btn">Mark as trusted trader</button>

            <div className="user__profile-horizontal-line"></div>
            <p className="user__profile-join-date">Joined 2 months ago</p>
            <button className="user__profile-report-btn">Report @gidigbi</button>
        </section>
    )
}

export default ChatUserProfile
