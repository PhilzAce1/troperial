import React, { useContext, useState, useEffect } from 'react';
import { emailRegex } from '../constants/regex';
import { AppContext } from '../libs/contextLib';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Fade from 'react-reveal/Fade';
/**Images */
import SignInSvg from '../assets/images/troperial-sign-in-svg.PNG';
import img from './../assets/images/Logo.png';
/**Custom Components */
import OnboardingFormContainer from '../components/OnboardingFormContainer/OnboardingFormContainer';
import OnboardingContainer from '../components/OnboardingContainer/OnboardingContainer';
import ContentContainer from '../components/ContentContainer/ContentContainer';
import OnboardingFooter from '../components/OnboardingFooter/OnboardingFooter';
import OnboardingAside from '../components/OnboardingAside/OnboardingAside';
import OnboardingMain from '../components/OnboardingMain/OnboardingMain';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import InputError from '../components/InputError/InputError';

import {connect} from 'react-redux';

import {checkUserProfile} from '../actions/authActions';

const SignIn = ({checkUserProfile}) => {
  useEffect(() => {}, []);
  const { register, handleSubmit, errors } = useForm();
  const { userHasAuthenticated } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      const idToken = await Auth.currentSession();
      localStorage.setItem('authToken', idToken.idToken.jwtToken);
      console.log(idToken.idToken.jwtToken)
    } catch (e) {
      setAuthError(e.message);
      setIsLoading(false);
    }
  };



  return (
    <OnboardingContainer>
      <OnboardingAside illustration={SignInSvg} />
      <OnboardingMain>
        <OnboardingFormContainer>
          <ContentContainer>
          <Link to="/"><img src={img} alt="troperial logo" /></Link>
            <h2>
              Sign In to{' '}
              <span className="troperial-green">Troperial</span>
            </h2>
            <p>
              Enter your email address and password
              <br /> to sign in to Troperial
            </p>
            {authError && (
              <CustomAlert
                message={authError}
                onClick={() => setAuthError(false)}
              />
            )}
          </ContentContainer>
          <Fade cascade bottom>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
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

              <div>
                {errors.password?.type === 'required' && (
                  <InputError>Your password is required</InputError>
                )}
                <CustomInput
                  showError={errors.password ? true : false}
                  register={register({ required: true })}
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                />
              </div>
              <div>
                <CustomButton loading={isLoading}>
                  Sign In
                </CustomButton>
              </div>
            </form>
          </Fade>
          <ContentContainer>
            <p className="custom-cta">
              Forgot Your Password?{' '}
              <Link to="/forgotpassword">Click here</Link>
            </p>
            <p className="custom-cta">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </ContentContainer>
        </OnboardingFormContainer>
        <OnboardingFooter />
      </OnboardingMain>
    </OnboardingContainer>
  );
};

export default connect(null, {
  checkUserProfile,
})(SignIn);
