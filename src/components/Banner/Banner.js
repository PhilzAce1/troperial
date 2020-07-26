import React from 'react';
import './Banner.css';
import icon from '../../assets/images/all-listings.PNG';
const Banner = ({ onClick, title, message, buttonText, hideSvg }) => {
  return (
    <div className="banner__container">
      <div className="banner__textContent">
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onClick} className="banner__listing-btn">
          {buttonText}
        </button>
      </div>
      {hideSvg ? null : (
        <div className="banner__image">
          <img src={icon} alt="banner" />
        </div>
      )}
    </div>
  );
};

Banner.defaultProps = {
  title: 'Post a Listing',
  message:
    'The quick, fairer way to exchange currencies across borders',
  buttonText: 'Create a listing',
  hideSvg: false
};
export default Banner;
