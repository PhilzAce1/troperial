import React from 'react';
import './Profile';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  checkUserProfile,
  updateUserDetails,
} from '../../actions/authActions';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import InputError from '../../components/InputError/InputError';
import { nameRegex, phoneRegex, emailRegex } from '../../constants/regex';
import Avatar from 'react-avatar';
const Account = ({
  userCognitoEmail,
  defaultValues,
  fetched,
  updateUserDetails,
  getUserDetails,
  firstName,
  lastName
}) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    updateUserDetails(data);
    getUserDetails();
  }
  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleSubmit(onSubmit)}>
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
           {firstName ? <Avatar className="CustomAvatar-image" name={`${firstName} ${lastName}`} size="50" round={true} />: <Avatar name={'*'} size="50" round={true} />}
        </div>
        <div className="grid-item headers">
          <h3 className="profile__input-data-heading">Username</h3>
          <p className="profile__input-data-paragraph">
            Customize your Troperial username
          </p>
        </div>
        <div className="grid-item">
        {errors.username && (
          <InputError>Usernames must be 6 to 8 characters long and contain only letters</InputError>
        )}
          <CustomInput
            name="username"
            type="text"
            label="Username"
            placeholder="Username"
            showError={errors.username ? true : false}
            register={register({
              required: true,
              minLength: 6,
              maxLength: 8
           })}
           disabled={!fetched ? true : false}
           defaultValue={defaultValues.username}
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
          {errors.firstname?.type === 'required' && (
              <InputError>First name is required</InputError>
          )}
            {errors.firstname?.type === 'pattern' && (
              <InputError>First name should consist of only alphabets</InputError>
            )}
            <CustomInput
              name="firstname"
              type="text"
              label="firstname"
              placeholder="firstname"
              showError={errors.firstname ? true : false}
              register={register({
                required: true,
                pattern: nameRegex
              })}
              defaultValue={defaultValues.firstname}
              disabled={!fetched ? true : false}
            />
          </div>
          <div>
          {errors.lastname?.type === 'required' && (
              <InputError>last name is required</InputError>
            )}
            {errors.lastname?.type === 'pattern' && (
              <InputError>Last name should consist of only alphabets</InputError>
            )}
            <CustomInput
              name="lastname"
              type="text"
              label="Lastname"
              placeholder="lastname"
              showError={errors.lastname ? true : false}
              register={register({
                required: true,
                pattern: nameRegex,
              
              })}
              defaultValue={defaultValues.lastname}
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
        {errors.email?.type === 'required' && (
                <InputError>Your email is required</InputError>
              )}
              {errors.email?.type === 'pattern' && (
                <InputError>
                  Please provide a valid email address
                </InputError>
              )}
          <CustomInput
            name="email"
            type="text"
            label="Email Address"
            placeholder="e.g johndoe@gmail.com"
            defaultValue={defaultValues.email}
            showError={errors.email ? true : false}
            register={register({
              required: true,
              pattern: emailRegex,
            })}
            disabled={!fetched ? true : false}
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
        {errors.phone?.type === 'required' && (
          <InputError>Phone number is required</InputError>
        )}
           {errors.phone?.type === 'pattern' && (
                <InputError>
                  Please ensure that you include your country code e.g +1****
                </InputError>
            )}

          <CustomInput
            name="phone"
            type="text"
            label="Phone Number"
            placeholder="e.g +234 8066474547"
            showError={errors.phone ? true : false}
            register={register({
              required: true,
              pattern: phoneRegex
            })}
            defaultValue={defaultValues.phone}
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
    </>
  );
};
const mapStateToProps = (state) => ({
  userCognitoEmail: state.auth.userCognitoEmail,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName
});
export default connect(mapStateToProps, {
  checkUserProfile,
  updateUserDetails,
})(Account);
