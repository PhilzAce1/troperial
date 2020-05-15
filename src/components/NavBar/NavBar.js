import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import profileImage from '../../assets/images/profile.png';

const NavBar = ({ page, icon }) => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    const menuState = menu;
    setMenu(!menuState);
  };
  return (
    <nav className="navigationBar">
      {/* large screen nav bar */}
      <section className="largeScreen__container">
        <div className="largeScreen__logoContainer">
          <img
            className="largeScreen__logo"
            src={logo}
            alt="troperial logo"
          />
        </div>
        <div className="largeScreen-links">
          <Link to="/listings">
            <i className="fas fa-align-justify"></i> Listings
          </Link>
          <Link to="/messages">
            <i className="fas fa-comment-alt"></i> messages
          </Link>
          <Link to="/notifications">
            <i className="fas fa-bell"></i> notifications
          </Link>
        </div>
        <div className="largeScreen__profileContainer">
          <img
            className="largeScreen__profile"
            src={profileImage}
            alt="profile"
          />
          <p>
            Peter <i className="fas fa-caret-down"></i>
          </p>
        </div>
      </section>
      {/* small screen navbar */}
      <section className="smallScreen__container">
        <div className="smallScreen__shield">
          <div className="smallScreen-logoContainer">
            <button onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className="smallScreen__pageTitle">
            <h4 className="title">
              {' '}
              <i className={icon}></i> {page}
            </h4>
          </div>
          <div className="smallScreen__profileContainer">
            <img
              className="smallScreen__profile"
              src={profileImage}
              alt="profile"
            />
          </div>
        </div>
        {/* navigation links */}
        {menu ? (
          <div className="smallScreen___linkContainer">
            <Link to="/listings">Listings</Link>
            <Link to="/messages">messages</Link>
            <Link to="/notifications">notifiactions</Link>
          </div>
        ) : null}
      </section>
    </nav>
  );
};

export default NavBar;
