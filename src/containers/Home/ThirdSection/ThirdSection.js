import React from 'react';
import './ThirdSection.css';
import desktopSvg from '../../../assets/svgs/platform-summary-group.svg';
import boyUser from '../../../assets/images/path-image-1.png';
import girlUser from '../../../assets/images/path-image-2.png';
import bypass1 from '../../../assets/svgs/bypass-1.svg';
import bypass2 from '../../../assets/svgs/bypass-2.svg';
import exchangeLogo from '../../../assets/svgs/Logo.svg';
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
const ThirdSection = () => {
    return (
        <section className="details-section">
        <div className="header">
          <h1>How Troperial Works</h1>
          <p>
          Connecting People to transact foreign currencies at a fair rate.
          </p>
          <Link to="/how-it-works" className="learn__more">
            Learn more about how it works
          </Link>
        </div>
        {/* DESKTOP SVG GROUP */}
        <img
          src={desktopSvg}
          className="desktop-group"
          alt="info-svg"
        />
        {/* END OF DESKTOP SVG GROUP */}
        {/* MOBILE SVG GROUP MARKUP */}
        <div className="mobile-group">
          <div className="mobile-group-card-1">
            <img
              className="chat-user"
              src={boyUser}
              alt="boy user svg"
            />
            <p>I have $1000 in dollars, i need naira.</p>
            <img
              src={bypass2}
              className="bypass bypass-2"
              alt="bypass"
            />
          </div>
         <div className="mobile_logo-container">
         <img
            className="exchange-troperial-logo"
            src={exchangeLogo}
            alt="exchange troperial logo"
          />
         </div>
          <div className="mobile-group-card-2">
            <img
              className="chat-user"
              src={girlUser}
              alt="girl user svg"
            />
            <p>I'll give you at a rate of NGN385 to $1</p>
            <img
              src={bypass1}
              className="bypass bypass-1"
              alt="bypass"
            />
          </div>
        </div>
        {/* END OF MOBILE SVG GROUP MARKUP */}
        <div className="info-grid">
        <Fade bottom>
          <div className="grid">
            <h1>Buyer</h1>
            <p>
              We connect buyers and traders, starting the right
              conversation that leads to an exchange
            </p>
          </div>
          </Fade>
          <Fade bottom>
          <div className="grid">
            <h1>Platform</h1>
            <p>
              We connect buyers and traders, starting the right
              conversation that leads to an exchange
            </p>
          </div>
          </Fade>
          <Fade bottom>
          <div className="grid">
            <h1>FX Trader</h1>
            <p>
              We connect buyers and traders, starting the right
              conversation that leads to an exchange
            </p>
          </div>
          </Fade>
        </div>
      </section>
    )
}

export default ThirdSection
