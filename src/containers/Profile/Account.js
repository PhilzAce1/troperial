import React from 'react';
import './Profile';
import CustomInput from '../../components/CustomInput/CustomInput';

import avatar from '../../assets/images/profile-picture.png';
import HybridInput from '../../components/HybridInput/HybridInput';
import CustomButton from '../../components/CustomButton/CustomButton';


const Account = () => {
    return (
     <form action="">
            <section className="profile_container">
            <div className="grid-item headers">
                <h3 className="profile__input-data-heading">Change Profile Picture</h3>
                <p className="profile__input-data-paragraph">choose a new avatar to be used across Troperial</p>
            </div>
            <div className="grid-item user-avatar-container">
                <img className="user-avatar" src={avatar} alt="user-profile-pic"/>
            </div>
            <div className="grid-item headers">
            <h3 className="profile__input-data-heading">Username</h3>
            <p className="profile__input-data-paragraph">Customize your Troperial username</p>
            </div>
            <div className="grid-item">
            <CustomInput
              name="username"
              type="text"
              label="Username"
              placeholder="Username"
            />
            </div>
            <div className="grid-item headers">
            <h3 className="profile__input-data-heading">Full Name</h3>
            <p className="profile__input-data-paragraph">Change your account name</p>
            </div>
            <div className="grid-item input-grid">
                <div>
                <CustomInput
              name="firstname"
              type="text"
              label="firstname"
              placeholder="firstname"
            />
                </div>
                <div>
                <CustomInput
              name="lastname"
              type="text"
              label="Lastname"
              placeholder="lastname"
            />
                </div>
            </div>
            <div className="grid-item headers">
            <h3 className="profile__input-data-heading">Email Address</h3>
            <p className="profile__input-data-paragraph">Get in touch with support to change this</p>
            </div>
            <div className="grid-item">
            <CustomInput
              name="email"
              type="text"
              label="Email Address"
              placeholder="e.g johndoe@gmail.com"
            />
            </div>
            <div className="grid-item headers">
            <h3 className="profile__input-data-heading">Phone Number</h3>
            <p className="profile__input-data-paragraph">Change your phone number</p>
            </div>
            <div className="grid-item">
             <HybridInput/>
             <div className="save-changes_btn">
             <CustomButton loading={false}>Save Changes</CustomButton>
             </div>
            </div>
        </section>
     </form>
    )
}

export default Account
