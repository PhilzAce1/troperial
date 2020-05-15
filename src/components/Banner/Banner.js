import React from 'react';
import './Banner.css';
import icon from '../../assets/images/all-listings.PNG'
const Banner = ({onClick}) => {
    return (
        <div className="banner__container">
            <div className="banner__textContent">
                <h3>Post a Listing</h3>
                <p>The quick, fairer way to exchange currencies across borders</p>
                <button onClick={onClick} className="banner__listing-btn">Post a listing</button>
            </div>
            <div className="banner__image">
              <img src={icon} alt="banner"/>
            </div>
        </div>
    )
}
export default Banner
