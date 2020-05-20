import React from 'react';
import './CustomButton.css';
import PulseLoader from 'react-spinners/PulseLoader';
const CustomButton = ({
  children,
  disabled,
  loading,
  onClickHandler,
  padding,
  fontSize,
  width
}) => {
  return (
    <button
      onClick={onClickHandler}
      className="customButton"
      disabled={disabled}
      style={{padding, fontSize, width}}
    >
      <PulseLoader size={10} color={'#fff'} loading={loading} />
      {!loading && children}
    </button>
  );
};

CustomButton.defaultProps = {
  padding: "13px",
  fontSize: "medium",
  width: "100%"
}
export default CustomButton;
