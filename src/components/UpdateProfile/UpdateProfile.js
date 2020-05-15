import React from 'react';
import './UpdateProfile.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import profileImg from '../../assets/images/troperial-profile-aside.PNG';
import InputError from '../InputError/InputError';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createUser } from '../../actions/authActions';

const UpdateProfile = ({ onClick, createUser }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const { firstname, lastname, username, phone } = data;
    createUser(firstname, lastname, username, phone);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="backdrop__form" action="">
        <div className="backdrop__profile-heading">
          <img src={profileImg} alt="update profile" />
          <h2>Update Your profile to post your first listing</h2>
        </div>
        <div className="backdrop__form--grid-input">
          <div>
            {errors.firstname?.type === 'required' && (
              <InputError>Your first name is required</InputError>
            )}
            <CustomInput
              showError={errors.firstname ? true : false}
              register={register({
                required: true,
              })}
              name="firstname"
              type="text"
              label="First name"
              placeholder="First name"
            />
          </div>
          <div>
            {errors.lastname?.type === 'required' && (
              <InputError>Your last name is required</InputError>
            )}
            <CustomInput
              name="lastname"
              type="text"
              label="Last name"
              placeholder="Last name"
              showError={errors.lastname ? true : false}
              register={register({
                required: true,
              })}
            />
          </div>
        </div>
        <p className="firstname_lastname_assurance">
          Providing Your name is for identity purposes, we would not
          share this with anyone.
        </p>
        {errors.username?.type === 'required' && (
          <InputError>Your username is required</InputError>
        )}
        <CustomInput
          name="username"
          type="text"
          label="Username"
          placeholder="Username"
          hint="Any listings you post will bear this username"
          showError={errors.username ? true : false}
          register={register({
            required: true,
          })}
        />
        {errors.phone?.type === 'required' && (
          <InputError>Your Phone number is required</InputError>
        )}
        <CustomInput
          name="phone"
          type="text"
          label="Phone Number"
          placeholder="Phone Number E.g +234 ..."
          showError={errors.phone ? true : false}
          register={register({
            required: true,
          })}
        />
        <CustomButton loading={false}>Update Profile</CustomButton>
      </div>
    </form>
  );
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createUser })(
  UpdateProfile,
);
