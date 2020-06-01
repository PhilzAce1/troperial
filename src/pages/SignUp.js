import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import validator from 'validator';
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
  const [showPasswordQuality, setShowPasswordQuality] = useState(
    false,
  );
  const [passwordQuality, setPasswordQuality] = useState({
    quality: '',
    percentage: '',
  });
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
      console.log(newUser);
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      setAuthError(e.message);
      console.log(e);
      setIsLoading(false);
    }
  };

  const match = (password, reg = passwordRegex) =>
    validator.matches(password, reg);

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setShowPasswordQuality(false);
    }
    if (match(password) && password.length === 6) {
      setShowPasswordQuality(true);
      setPasswordQuality({
        quality: 'Medium',
        percentage: '50',
      });
    }

    if (password.length > 6 && match(password)) {
      setShowPasswordQuality(true);
      setPasswordQuality({
        quality: 'Strong',
        percentage: '80',
      });
    }
  };

  const renderForm = () => {
    return (
      <OnboardingFormContainer>
        <ContentContainer>
        <Link to="/"><img src={img} alt="troperial logo" /></Link>
          <h2>
            Create a{' '}
            <span className="troperial-green">Troperial</span> Account
          </h2>
          <p>
            Create an account to gain access to a quick &amp; secure
            way to exchange currencies.
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
                <InputError>Your input is required</InputError>
              )}
              {errors.password?.type === 'pattern' && (
                <InputError>
                  Password must have 6 to 30 characters
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
                onChange={(e) =>
                  checkPasswordStrength(e.target.value)
                }
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
              {showPasswordQuality === true ? (
                <ProgressBar grade={passwordQuality} />
              ) : null}
              <CustomButton loading={isLoading}>
                Create An Account
              </CustomButton>
            </div>
          </form>
        </Fade>

        <ContentContainer>
          <p className="custom-cta">
            already got an account? <Link to="/signin">Sign In</Link>
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
          title="Check your email"
          message="click the link on the email we sent to you to verify your account"
        />
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
