import React, {useState} from 'react'
import './WaitListForm.css';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput'
import { useForm } from 'react-hook-form';
import { emailRegex } from '../../constants/regex';
import InputError from '../../components/InputError/InputError';
import {toast} from 'react-toastify'

import Select from 'react-select';
import axios from 'axios';
const WaitListForm = () => {
const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [discoveredUsFrom, setDiscoveredUsFrom] = useState(null);

  const discoveredUsFromOptions = [
    {
      label: 'Social Media',
      value: 'Social Media'
    },
    {
      label: 'A Friend',
      value: 'A Friend'
    }
  ]

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '10px',
      marginTop: '10px',
      padding: '4px 0',
      borderWidth:'2px',
      borderColor: "#e8e8e8",
      '&:hover': {
        borderColor: '#0383ef'
      },
      '&:focus': {
        borderColor: '#0383ef'
      }
    }),
  };


  const handleDiscoveredUsFrom = selectedOption =>  setDiscoveredUsFrom(selectedOption);

  const onSubmit = async (data) => {
      const {firstName, lastName, email} = data;
      setIsLoading(true);
   try {
    const response = await axios.post('https://persons.api.troperial.com/persons/register', {
        firstName,
        lastName,
        emailAddress: email,
        discoveredUsFrom: discoveredUsFrom.value
    });

    console.log(response)
   toast.success(response.data)
    setIsLoading(false)
    
   }catch(e) {
    console.log(e.response)
    toast.error('registration failed, Please try again')
    setIsLoading(false)
   }

  }
    return (
        <section className="waitList">
            <h1 className="waitlList_header">Join the Wait List</h1>
            {/* {authError && (
            <CustomAlert
              message={authError}
              onClick={() => setAuthError(false)}
            />
          )} */}
         <form onSubmit={handleSubmit(onSubmit)} className="waitList_form">
              <div className="waitList_inputField">
                {errors.firstName?.type === 'required' && (
                  <InputError>Your first name is required</InputError>
                )}
                <CustomInput
                  showError={errors.firstName ? true : false}
                  register={register({
                    required: true
                  })}
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                />
              </div>
              <div className="waitList_inputField">
                {errors.lastName?.type === 'required' && (
                  <InputError>Your last name is required</InputError>
                )}
                <CustomInput
                  showError={errors.lastName ? true : false}
                  register={register({
                    required: true
                  })}
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
              </div>
              <div className="waitList_inputField">
                {errors.email?.type === 'required' && (
                  <InputError>Your email is required</InputError>
                )}
                {errors.email?.type === 'pattern' && (
                  <InputError>
                    Please provide a valid email address
                  </InputError>
                )}
                <CustomInput
                  showError={errors.email ? true : false}
                  register={register({
                    required: true,
                    pattern: emailRegex,
                  })}
                  type="text"
                  name="email"
                  label="Email"
                  placeholder="Email"
                />
              </div>
              <div className="waitList_inputField">
              <Select value={discoveredUsFrom} onChange={handleDiscoveredUsFrom} placeholder="Where Did You hear About Us?" styles={customStyles} options={discoveredUsFromOptions} />
              </div>
              <div className="waitList_submitBtn">
                <CustomButton loading={isLoading}>
                  Join the wait list
                </CustomButton>
              </div>
            </form>
        </section>
    )
}

export default WaitListForm;
