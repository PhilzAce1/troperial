import React, { useState, useRef } from 'react';
/**Custom Components */
import OnboardingFormContainer from '../components/OnboardingFormContainer/OnboardingFormContainer';
import OnboardingNotification from '../components/OnboardingNotification/OnboardingNotification';
import OnboardingContainer from '../components/OnboardingContainer/OnboardingContainer';
import ContentContainer from '../components/ContentContainer/ContentContainer';
import OnboardingFooter from '../components/OnboardingFooter/OnboardingFooter';
import OnboardingAside from '../components/OnboardingAside/OnboardingAside';
import OnboardingMain from '../components/OnboardingMain/OnboardingMain';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomInput from '../components/CustomInput/CustomInput';
import CustomAlert from '../components/CustomAlert/CustomAlert';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import InputError from '../components/InputError/InputError';
/**Images */
import forgotpasswordIllustration from '../assets/images/forgot-password-svg.PNG';
import notificationIcon from '../assets/images/reset-password-illus.PNG';
import img from './../assets/images/Logo.png';
/**Packages */
import { passwordRegex, emailRegex } from '../constants/regex';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [passwordTrack, setPasswordTrack] = useState('');
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const handleEmailForm = async (data) => {
    const { email } = data;
    setEmail(email);
    setIsLoading(true);
    try {
      await Auth.forgotPassword(email);
      setIsLoading(false);
      setStep(2);
    } catch (e) {
      console.log(e);
      setAuthError(e.message);
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data) => {
    const { code, password } = data;
    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(email, code, password);
      setIsLoading(false);
      setStep(4);
    } catch (e) {
      console.log(e);
      setAuthError(e.message);
      setIsLoading(false);
    }
  };


  const renderEmailForm = () => {
    return (
      <OnboardingFormContainer>
        <ContentContainer>
        <Link to="/"><img src={img} alt="troperial logo" /></Link>
          <h2>Forgot Your Password</h2>
          <p>
            Enter your Troperial email address and we'll
            <br /> send you a link to reset your password
          </p>
          {authError && (
            <CustomAlert
              message={authError}
              onClick={() => setAuthError(false)}
            />
          )}
        </ContentContainer>
        <form action="" onSubmit={handleSubmit(handleEmailForm)}>
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
          <CustomButton loading={isLoading}>Next</CustomButton>
        </form>
        <ContentContainer>
          <p className="sendToNewPage">
            Remember Your password? <Link to="/signin">Sign In</Link>
          </p>
        </ContentContainer>
      </OnboardingFormContainer>
    );
  };

  const renderResetPasswordForm = () => {
    return (
      <OnboardingFormContainer>
        <ContentContainer>
          <img src={img} alt="troperial logo" />
          <h2>Set a password</h2>
          <p>
            Make sure to set a password that's
            <br /> unique to you, difficult and not easy to guess
          </p>
          {authError && (
            <CustomAlert
              message={authError}
              onClick={() => setAuthError(false)}
            />
          )}
        </ContentContainer>
        <form action="" onSubmit={handleSubmit(handleResetPassword)}>
          {errors.code?.type === 'required' && (
            <InputError>Your input is required</InputError>
          )}
          <CustomInput
            name="code"
            type="text"
            showError={errors.code ? true : false}
            register={register({ required: true })}
            label="Verfication Code"
            placeholder="Verification Code"
          />
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
            onChange={(e) => setPasswordTrack(e.target.value)}
            label="Password"
            placeholder="Password"
          />
          {errors.password_repeat && (
              <span>{errors.password_repeat.message}</span>
          )}
          <CustomInput
            showError={errors.password_repeat ? true : false}
            register={register({
              required: true,
              validate: (value) =>
                value === password.current || (
                  <InputError>The passwords do not match</InputError>
                ),
            })}
            name="password_repeat"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
          />
            <ProgressBar value={passwordTrack} />
          <CustomButton loading={isLoading}>
            Set Password
          </CustomButton>
        </form>
        <ContentContainer>
          <p className="custom-cta">
            Remember Your Password? <Link to="/">Sign In</Link>
          </p>
        </ContentContainer>
      </OnboardingFormContainer>
    );
  };

  const renderNotification = (title, message, link) => {
    return (
      <div>
        <OnboardingNotification
          notificationIcon={notificationIcon}
          title={title}
          message={message}
        >
          <CustomButton
            onClickHandler={link ? null : () => setStep(3)}
            loading={false}
          >
            {link ? (
              <Link to="/signin">Get back in </Link>
            ) : (
              'Reset Password'
            )}
          </CustomButton>
        </OnboardingNotification>
      </div>
    );
  };

  const checkStep = (step) => {
    if (step === 1) {
      return renderEmailForm();
    } else if (step === 2) {
      return renderNotification(
        'Check Your Mail!',
        'Check your mail to see the verification mail we sent to you and come back to click next',
        false,
      );
    } else if (step === 3) {
      return renderResetPasswordForm();
    } else {
      return renderNotification(
        "Your Password's been reset!",
        'Now you can get back into your account to make the trades you want.',
        true,
      );
    }
  };
  return (
    <OnboardingContainer>
      <OnboardingAside illustration={forgotpasswordIllustration} />
      <OnboardingMain>
        {checkStep(step)}
        <OnboardingFooter />
      </OnboardingMain>
    </OnboardingContainer>
  );
};

export default ForgotPassword;
