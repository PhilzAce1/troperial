import React, { useState, useContext } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import Gravatar from 'react-gravatar'
import {connect} from 'react-redux';
import { AppContext } from '../../libs/contextLib';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
const NavBar = ({ page, icon, userCognitoEmail}) => {
  const history = useHistory();
  const { userHasAuthenticated } = useContext(AppContext);
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    const menuState = menu;
    setMenu(!menuState);
  };
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/');
  }
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
          <NavLink
            activeClassName="is-active"
            className="nav-link"
            to="/listings"
          >
             <span className="icon icon-listings"></span> Listings
          </NavLink>
          <NavLink
            activeClassName="is-active"
            className="nav-link"
            to="/messages"
          >
            <span className="icon icon-messages"></span> messages
          </NavLink>
          <NavLink
            activeClassName="is-active"
            className="nav-link"
            to="/notifications"
          >
             <span className="icon icon-notifications"></span> notifications
          </NavLink>
        </div>
        <div className="profile-container">
        <NavLink
            activeClassName="profile-is-active"
            className="profile_nav-link"
            to="/profile"
          >
             <Gravatar email={userCognitoEmail} size={22} rating="pg" default="monsterid" className="largeScreen__profile" />
            <span>
              Peter <i className="fas fa-caret-down"></i>
            </span>
          </NavLink>
          <div className="border"></div>
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
              <span className={`icon ${icon}`}></span> {page}
            </h4>
          </div>
          <div className="smallScreen__profileContainer">
    
            <Gravatar email={userCognitoEmail === null ? 'null@null.com': userCognitoEmail} size={22} rating="pg" default="mp" className="smallScreen__profile" />
  
          </div>
        </div>
        {/* navigation links */}
        {menu ? (
          <div className="smallScreen___linkContainer">
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              to="/listings"
            >
              Listings
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              to="/messages"
            >
              messages
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              to="/notifications"
            >
              notifications
            </NavLink>
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              to="/profile"
            >
              Profile
            </NavLink>
          <div className="small_screen-horizonal-line"></div>
            <button
             onClick={handleLogout}
             className="navigation-logout-btn"
            >
              Logout
            </button>
          </div>
        ) : null}
      </section>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  userCognitoEmail: state.auth.userCognitoEmail
});
export default connect(mapStateToProps, null)(NavBar)