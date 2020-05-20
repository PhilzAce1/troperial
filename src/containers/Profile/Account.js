import React from 'react';
import './Profile';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {
  checkUserProfile,
  updateUserDetails,
} from '../../actions/authActions';
import { useForm } from 'react-hook-form';
import Gravatar from 'react-gravatar';
import { connect } from 'react-redux';

const Account = ({
  userCognitoEmail,
  defaultValues,
  onChangeHandler,
  fetched,
  updateUserDetails,
}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => updateUserDetails(data);
  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <section className="profile_container">
        <div className="grid-item headers">
          <h3 className="profile__input-data-heading">
            Change Profile Picture
          </h3>
          <p className="profile__input-data-paragraph">
            choose a new avatar to be used across Troperial
          </p>
        </div>
        <div className="grid-item user-avatar-container">
          <Gravatar
            email={
              userCognitoEmail === null
                ? 'null@null.com'
                : userCognitoEmail
            }
            size={50}
            rating="pg"
            default="mp"
            className="CustomAvatar-image"
          />
        </div>
        <div className="grid-item headers">
          <h3 className="profile__input-data-heading">Username</h3>
          <p className="profile__input-data-paragraph">
            Customize your Troperial username
          </p>
        </div>
        <div className="grid-item">
          <CustomInput
            name="username"
            type="text"
            label="Username"
            placeholder="Username"
            register={register}
            value={defaultValues.username}
            onChange={(e) => onChangeHandler(e)}
            disabled={!fetched ? true : false}
          />
        </div>
        <div className="grid-item headers">
          <h3 className="profile__input-data-heading">Full Name</h3>
          <p className="profile__input-data-paragraph">
            Change your account name
          </p>
        </div>
        <div className="grid-item input-grid">
          <div>
            <CustomInput
              name="firstname"
              type="text"
              label="firstname"
              placeholder="firstname"
              register={register}
              value={defaultValues.firstname}
              onChange={(e) => onChangeHandler(e)}
              disabled={!fetched ? true : false}
            />
          </div>
          <div>
            <CustomInput
              name="lastname"
              type="text"
              label="Lastname"
              placeholder="lastname"
              register={register}
              value={defaultValues.lastname}
              onChange={(e) => onChangeHandler(e)}
              disabled={!fetched ? true : false}
            />
          </div>
        </div>
        <div className="grid-item headers">
          <h3 className="profile__input-data-heading">
            Email Address
          </h3>
          <p className="profile__input-data-paragraph">
            Get in touch with support to change this
          </p>
        </div>
        <div className="grid-item">
          <CustomInput
            name="email"
            type="text"
            label="Email Address"
            placeholder="e.g johndoe@gmail.com"
            register={register}
          />
        </div>
        <div className="grid-item headers">
          <h3 className="profile__input-data-heading">
            Phone Number
          </h3>
          <p className="profile__input-data-paragraph">
            Change your phone number
          </p>
        </div>
        <div className="grid-item">
          <CustomInput
            name="phone"
            type="text"
            label="Phone Number"
            placeholder="e.g +234 8066474547"
            register={register}
            value={defaultValues.phone}
            onChange={(e) => onChangeHandler(e)}
            disabled={!fetched ? true : false}
          />
          <div className="save-changes_btn">
            <CustomButton
              loading={false}
              disabled={!fetched ? true : false}
            >
              Save Changes
            </CustomButton>
          </div>
        </div>
      </section>
    </form>
  );
};
const mapStateToProps = (state) => ({
  userCognitoEmail: state.auth.userCognitoEmail,
});
export default connect(mapStateToProps, {
  checkUserProfile,
  updateUserDetails,
})(Account);
