import React, { useState, useRef, Fragment } from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Select from 'react-select';
import { Auth } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import InputError from '../../components/InputError/InputError';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import CustomAlert from '../../components/CustomAlert/CustomAlert';
import { passwordRegex } from '../../constants/regex';
import verifyIcon from '../../assets/images/troperial-verified.PNG';
import { connect } from 'react-redux';
const Verification = ({ userCognitoEmail }) => {
  const { register, handleSubmit, errors, watch } = useForm();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [passwordTrack, setPasswordTrack] = useState('');
  const password = useRef({});
  password.current = watch('password', '');

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];
  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: '10px',
      marginTop: '10px',
      padding: '4px 0',
    }),
  };

  const handleResetPassword = async (data) => {
    const { code } = data;
    setIsLoading(true);
    try {
      await Auth.forgotPasswordSubmit(userCognitoEmail, code, passwordTrack);
      setIsLoading(false);
      setStep(3);
      setTimeout(() => {
        setStep(1);
        setPasswordTrack('')
      }, 2000);
    } catch (e) {
      setIsLoading(false);
      setAuthError(e.message);
    }
  };
  const onSubmit = async (data) => {
    setIsLoading(true);
    const { password } = data;
    try {
      await Auth.forgotPassword(userCognitoEmail);
      setPasswordTrack(password);
      setIsLoading(false);
      setStep(2);
    } catch (e) {
      setIsLoading(false);
      setAuthError(e.message)
    }
  };
  const renderPasswordForm = () => {
    return (
      <div className="change_password_section">
        <div className="title-section">
          <h3 className="change_password-title">
            Change Your Password
          </h3>
          <p>Need to change your password? do it here.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
        {authError === '' ?  null:(
            <CustomAlert
              message={authError}
              onClick={() => setAuthError('')}
            />
          )}
          {errors.password?.type === 'required' && (
            <InputError>Please provide a valid password</InputError>
          )}
          {errors.password?.type === 'pattern' && (
            <InputError>
              Password must be between 6 - 20 characters and must
              include atleast 1 Uppercase letter, 1 Lowercase letter,
              1 numeric value and one special character.
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
            placeholder="New Password"
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
                  <InputError>The passwords do not match</InputError>
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
          <CustomButton loading={isLoading}>Change Password</CustomButton>
        </div>
      </form>
     </div>
    );
  };
  const renderConfirmation = () => {
    return (
      <div style={{marginTop:"10px"}} className="verification-confirmation-message">
        <img src={verifyIcon} alt="verified" />
        <div>
          <h2 className="heading">Password Changed!</h2>
          <p className="verificatin-message">
            Your Password was successfully changed.henceforth when you
            must use your new password to log in.
          </p>
        </div>
      </div>
    );
  };
  const renderCodeForm = () => {
    return (
      <div className="change_password_section">
        <div className="title-section">
          <h3 className="change_password-title">
            We sent you a mail!
          </h3>
          <p>
            Please check your mail to copy the code sent to you to
            complete your password reset
          </p>
        </div>
        <form onSubmit={handleSubmit(handleResetPassword)}>
        <div className="input-section">
        {authError === '' ?  null:(
            <CustomAlert
              message={authError}
              onClick={() => setAuthError('')}
            />
          )}
          {errors.code?.type === 'required' && (
            <InputError>
              Please provide the code sent to your email
            </InputError>
          )}
          <CustomInput
            name="code"
            type="text"
            showError={errors.code ? true : false}
            register={register({ required: true })}
            label="Verfication Code"
            placeholder="Verification Code"
          />
          <CustomButton loading={isLoading}>
            Complete Password reset
          </CustomButton>
        </div>
      </form>
    </div>
    );
  };

  const renderStep = (step) => {
    if (step === 1) {
      return renderPasswordForm();
    } else if (step === 2) {
      return renderCodeForm();
    } else {
      return renderConfirmation();
    }
  };
  return (
    <section className="verification-and-change-password-container">
      {/* <div className="verification-confirmation-message">
            <img src={verifyIcon} alt="verified"/>
            <div>
                <h2 className="heading">Your Account is being Verified</h2>
                <p className="verificatin-message">Youre verifying our account by adding your official ID to troperial. This allows you to post as many listings as possible and instantly too.</p>
            </div>
        </div> */}
      <div className="verification_section">
        <div className="title-section">
          <h3 className="verify-title">
            Verify Your Account with an Official ID
          </h3>
          <p>
            Verifying your account with an official ID helps build
            trust between traders who are going to exchange
            currencies.
          </p>
          <p>
            Your official ID information is not shared with anyone
          </p>
        </div>
        <div className="input-section">
          <Select styles={customStyles} options={options} />
          <Select styles={customStyles} options={options} />
          <CustomButton loading={false}>
            Verify your account
          </CustomButton>
        </div>
      </div>
      <div className="horizontal-line"></div>
        {renderStep(step)}
    </section>
  );
};
const mapStateToProps = (state) => ({
  userCognitoEmail: state.auth.userCognitoEmail,
});
export default connect(mapStateToProps, null)(Verification);
