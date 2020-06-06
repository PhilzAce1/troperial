import React from 'react';
import dp from '../../assets/images/profile-picture.png';
import './UserConvoButton.css';

const UserConvoButton = ({username, unread, active}) => {
    return (
        <button className={`user-convo-btn ${active && 'active-chat'}`}>
            <span>
            <img className="user-profile-picture" src={dp} alt="user dp"/>
            </span>
    <span className="username">@{username}</span>
            {unread && <span className="unread-messages"></span>}
        </button>
    )
}

UserConvoButton.defaultProps = {
 username: 'username',
 unread: false,
 active: false
}
export default UserConvoButton
