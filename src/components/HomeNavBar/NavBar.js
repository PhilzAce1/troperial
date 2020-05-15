import React, { useState } from 'react';
import './NavBar.css';
import {Link} from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';
import logo from '../../assets/images/Logo.png';

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const toggleMenu = () => {
    const menuState = menu;
    setMenu(!menuState);
  };
  return (
    <nav className="navbar">
      <div className="navbarContainer">
        <div>
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>

        <div>
          <div className="mainLinks hideOnMobile">
            <span>
              <a href="">How it works</a>
            </span>
            <span>
              <a href="">Market News</a>
            </span>
            <span>
              <a href="">Help</a>
            </span>
            <span>
              <a href="">About</a>
            </span>
          </div>
        </div>

        <div>
          <div className="authLinks hideOnMobile">
            <span>
              <Link to="/signin">login</Link>
            </span>
            <span className="signUpDesktop">
              <CustomButton loading={false} padding="10px" fontSize="0.9rem">
              <Link to="/signup">create an account</Link>
              </CustomButton>
            </span>
          </div>
          <i onClick={toggleMenu} className="hamburger fas fa-bars" />
        </div>
      </div>

      {menu ? (
        <div className="mobileNav">
          <div className="mobileNavContainer">
            <span>
              <a href="">How it works</a>
            </span>
            <span>
              <a href="">Market News</a>
            </span>
            <span>
              <a href="">Help</a>
            </span>
            <span>
              <a href="">About</a>
            </span>
            <div className="horizontal-line" />
            <span>
            <Link to="/signin">login</Link>
            </span>
            <span className="signUpMobile">
            <Link to="/signup">create an account</Link>
            </span>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
