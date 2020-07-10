import React, { useState, useContext } from 'react';
import './NavBar.css';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../assets/images/Logo.png';
import { connect } from 'react-redux';
import { AppContext } from '../../libs/contextLib';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Avatar from 'react-avatar';
const NavBar = ({
  page,
  icon,
  userCognitoEmail,
  username,
  profileUpdated,
  firstName,
  lastName
}) => {
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
    localStorage.removeItem('authToken');
    if (localStorage.getItem('unAuthenticatedUserListing')) {
      localStorage.removeItem('unAuthenticatedUserListing');
    }
    history.push('/');
  }
  return (
    <nav className="navigationBar">
      {/* large screen nav bar */}
      <section className="largeScreen__container">
        <div className="largeScreen__logoContainer">
          <Link to="/listings">
            <img
              className="largeScreen__logo"
              src={logo}
              alt="troperial logo"
            />
          </Link>
        </div>
        <div className="largeScreen-links">
          <NavLink
            activeClassName="is-active"
            className="nav-link"
            to="/listings"
          >
            <span className="icon icon-listings"></span> Listings
          </NavLink>
          {profileUpdated && (
            <NavLink
              activeClassName="is-active"
              className="nav-link"
              to="/messages"
            >
              <span className="icon icon-messages"></span> messages
            </NavLink>
          )}
          <NavLink
            activeClassName="is-active"
            className="nav-link"
            to="/notifications"
          >
            <span className="icon icon-notifications"></span>{' '}
            notifications
          </NavLink>
        </div>
        <div className="profile-container">
          <NavLink
            activeClassName="profile-is-active"
            className="profile_nav-link"
            to="/profile"
          >
          
            <span>
            {firstName ? <Avatar name={`${firstName} ${lastName}`} size="25" round={true} />: <Avatar name={'*'} size="25" round={true} />}
              {username && (
                <span className="navbar-username">{username}</span>
              )}

              <i className="fas fa-caret-down"></i>
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
          {firstName ? <Avatar name={`${firstName} ${lastName}`} size="25" round={true} />: <Avatar name={'*'} size="25" round={true} />}
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
            {profileUpdated && (
              <NavLink
                activeClassName="is-active"
                className="nav-link"
                to="/messages"
              >
                messages
              </NavLink>
            )}
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
  userCognitoEmail: state.auth.userCognitoEmail,
  username: state.auth.userName,
  firstName: state.auth.firstName,
  lastName: state.auth.lastName,
  profileUpdated: state.auth.profileUpdated,
});
export default connect(mapStateToProps, null)(NavBar);
