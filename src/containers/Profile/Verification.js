import React from 'react';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import Select from 'react-select';
const Verification = () => {
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
      <div className="change_password_section">
        <div className="title-section">
          <h3 className="change_password-title">
            Change Your Password
          </h3>
          <p>Need to change your password? do it here.</p>
        </div>
        <div className="input-section">
          <form action="">
            <CustomInput
              name="oldpassword"
              type="password"
              label="Old Password"
              placeholder="*********"
            />
            <CustomInput
              name="newpassword"
              type="password"
              label="New Password"
              placeholder="New Password"
            />
            <CustomInput
              name="confirmpassword"
              type="password"
              label="Confirm Password"
              placeholder="Re-type new password"
            />
            <CustomButton loading={false}>
              Change Password
            </CustomButton>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Verification;
