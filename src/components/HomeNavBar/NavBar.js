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
          <Link to="/" className='troperial_home_logo'><img src={logo} alt="logo" /></Link>

          <ul className="mainLinks hideOnMobile">
            <li>
              <Link className="link" to="/">How it works</Link>
            </li>
            <li>
              <Link className="link" to="/">Market News</Link>
            </li>
            <li>
              <Link className="link" to="/">Help</Link>
            </li>
            <li>
              <Link className="link" to="/">About</Link>
            </li>
          </ul>

        <div>
          <ul className="authLinks hideOnMobile">
            <li>
              <Link className="link" to="/signin">login</Link>
            </li>
            <li>
              <Link to="/signup" className="sign-up-link"><button className="signUpDesktop">create an account</button></Link>
            </li>
          </ul>
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
