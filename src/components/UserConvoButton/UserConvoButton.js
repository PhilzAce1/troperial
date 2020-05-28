import React from 'react';
import dp from '../../assets/images/profile-picture.png';
import './UserConvoButton.css';

const UserConvoButton = () => {
    return (
        <button className="user-convo-btn active-chat">
            <span>
            <img class="user-profile-picture" src={dp} alt="image"/>
            </span>
            <span className="username">@peter</span>
            <span className="unread-messages"></span>
        </button>
    )
}

export default UserConvoButton
