import React  from 'react';
import './UpdateProfile.css';
import CustomInput from '../CustomInput/CustomInput';
import CustomButton from '../CustomButton/CustomButton';
import profileImg from '../../assets/images/troperial-profile-aside.PNG';
import InputError from '../InputError/InputError';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { createUser } from '../../actions/authActions';
import {phoneRegex, nameRegex} from '../../constants/regex';

const UpdateProfile = ({ createUser }) => {
  const { register, handleSubmit, errors, } = useForm();
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
            {errors.firstname?.type === 'pattern' && (
              <InputError>First name should consist of only alphabets</InputError>
            )}
            <CustomInput
              showError={errors.firstname ? true : false}
              register={register({
                required: true,
                pattern: nameRegex
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
            {errors.lastname?.type === 'pattern' && (
              <InputError>Last name should consist of only alphabets</InputError>
            )}
            <CustomInput
              name="lastname"
              type="text"
              label="Last name"
              placeholder="Last name"
              showError={errors.lastname ? true : false}
              register={register({
                required: true,
                pattern: nameRegex,
              
              })}
            />
          </div>
        </div>
        <p className="firstname_lastname_assurance">
          Providing Your name is for identity purposes, we would not
          share this with anyone.
        </p>
        {errors.username === 'pattern' && (
          <InputError>Usernames must be 6 to 8 characters long and contain only letters</InputError>
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
            minLength: 6,
            maxLength: 8
          })}
        />
        {errors.phone?.type === 'required' && (
          <InputError>Your Phone number is required</InputError>
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
          placeholder="Phone Number E.g +234 ..."
          showError={errors.phone ? true : false}
          register={register({
            required: true,
            pattern: phoneRegex
          })}
        />
        <CustomButton loading={false}>Update Profile</CustomButton>
      </div>
    </form>
  );
};
export default connect(null, { createUser })(
  UpdateProfile,
);
