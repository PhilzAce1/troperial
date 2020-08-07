import React, { useState } from 'react';
import './NavBar.css';
import {Link, NavLink} from 'react-router-dom';
//import logo from '../../assets/images/Logo.png';
import logo from '../../assets/svgs/Logo.svg';

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

          {/* <ul className="mainLinks hideOnMobile">
            <li>
              <Link className="link" to="/how-it-works">How it works</Link>
            </li>
            <li>
              <Link className="link" to="/news">Market News</Link>
            </li>
            <li>
              <Link className="link" to="/help">Help</Link>
            </li>
            <li>
              <Link className="link" to="/about">About</Link>
            </li>
          </ul> */}

        <div>
          {/* <ul className="authLinks hideOnMobile">
            <li>
              <Link className="link" to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="sign-up-link"><button className="signUpDesktop">create an account</button></Link>
            </li>
          </ul> */}
    {/* <span onClick={toggleMenu} className="home-hamburger-icon"></span> */}
          
        </div>
        
      </div>

      {menu ? (
        <div className="mobileNav">
          <div className="mobileNavContainer">

              <NavLink activeClassName="home-active-link" to="/how-it-works" className="home-link">How it works</NavLink>


            <NavLink activeClassName="home-active-link" to="/news" className="home-link">Market News</NavLink>

   
            <NavLink activeClassName="home-active-link" to="/help" className="home-link">Help</NavLink>


            <NavLink activeClassName="home-active-link" to="/about" className="home-link">About</NavLink>

            <div className="mobile_screen-horizonal-line" />
 
            {/* <NavLink activeClassName="home-active-link" to="/signin" className="home-link">Sign In</NavLink>
   
            <button className="sign-up_btn"><Link className="home-sign-up" to="/signup">create an account</Link></button> */}
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default NavBar;
