import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Fade from 'react-reveal/Fade';
/**Components*/
import OnboardingFormContainer from '../components/OnboardingFormContainer/OnboardingFormContainer';
import OnboardingNotification from '../components/OnboardingNotification/OnboardingNotification';
import OnboardingContainer from '../components/OnboardingContainer/OnboardingContainer';
import ContentContainer from '../components/ContentContainer/ContentContainer';
import OnboardingFooter from '../components/OnboardingFooter/OnboardingFooter';
import OnboardingAside from '../components/OnboardingAside/OnboardingAside';
import OnboardingMain from '../components/OnboardingMain/OnboardingMain';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import InputError from '../components/InputError/InputError';
/**Images */
import notificationIcon from '../assets/images/troperial-email-illus.PNG';
import troperialSvg from '../assets/images/reset-password-svg.PNG';
import img from './../assets/images/Logo.png';
/**constants */
import { passwordRegex, emailRegex } from '../constants/regex';

const SignUp = () => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [passwordTrack, setPasswordTrack] = useState('');
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: email,
        password,
        attributes: {
          email, // optional
        },
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      setAuthError(e.message);
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    return (
      <OnboardingFormContainer>
        <ContentContainer>
          <Link to="/">
            <img src={img} alt="troperial logo" />
          </Link>
          <h2>
            Create a{' '}
            <span className="troperial-green">Troperial</span> Account
          </h2>
          <p>
          Create an account and gain access to the best platform for trading fx
          </p>
          {authError && (
            <CustomAlert
              message={authError}
              onClick={() => setAuthError(false)}
            />
          )}
        </ContentContainer>
        <Fade bottom cascade>
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
                <InputError>
                  Please provide a valid password
                </InputError>
              )}
              {errors.password?.type === 'pattern' && (
                <InputError>
                  Password must be between 6 - 20 characters and must
                  include atleast 1 Uppercase letter, 1 Lowercase
                  letter, 1 numeric value and one special character.
                </InputError>
              )}

              <CustomInput
                hint="Password must be between 6 - 20 characters and must include atleast 1 Uppercase letter, 1 Lowercase letter, 1 numeric value and one special character."
                showError={errors.password ? true : false}
                register={register({
                  required: true,
                  pattern: passwordRegex,
                })}
                name="password"
                type="password"
                onChange={(e) => setPasswordTrack(e.target.value)}
                label="Password"
                placeholder="Password"
              />
            </div>

            <div>
              {errors.password_repeat && (
                <div>{errors.password_repeat.message}</div>
              )}

              <CustomInput
                showError={errors.password_repeat ? true : false}
                register={register({
                  required: true,
                  validate: (value) =>
                    value === password.current || (
                      <InputError>
                        The passwords do not match
                      </InputError>
                    ),
                })}
                name="password_repeat"
                type="password"
                label="Confirm Password"
                placeholder="Confirm Password"
              />
            </div>

            <div>
              <ProgressBar value={passwordTrack} />
              <CustomButton loading={isLoading}>
                Create An Account
              </CustomButton>
            </div>
          </form>
        </Fade>

        <ContentContainer>
          <p className="custom-cta">
          Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </ContentContainer>
      </OnboardingFormContainer>
    );
  };

  const renderVerficationNotification = () => {
    return (
      <div>
        <OnboardingNotification
          notificationIcon={notificationIcon}
          title="You've got mail!"
          message="Click on the link in your email to verify your email address"
        >
          <Link to="/signin" style={{ textDecoration: 'none' }}>
            <CustomButton loading={false}>Sign In</CustomButton>
          </Link>
        </OnboardingNotification>
      </div>
    );
  };
  return (
    <OnboardingContainer>
      <OnboardingAside illustration={troperialSvg} />
      <OnboardingMain>
        {newUser === null
          ? renderForm()
          : renderVerficationNotification()}
        {newUser === null ? <OnboardingFooter /> : null}
      </OnboardingMain>
    </OnboardingContainer>
  );
};

export default SignUp;
