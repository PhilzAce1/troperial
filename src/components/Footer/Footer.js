import React from 'react';
import './Footer.css';
import image from '../../assets/svgs/success-wealth.svg';
import { Link } from 'react-router-dom';
import twitter from '../../assets/svgs/twitter.svg';
import instagram from '../../assets/svgs/instagram.svg';
import facebook from '../../assets/svgs/facebook.svg';
import linkedin from '../../assets/svgs/linkedIn.svg';
import logo from '../../assets/svgs/Logo.svg';

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-header">
        <img src={image} alt="success illustration" />
        <div className="footer-header_title">
          <p>Try Troperial Now.</p>
          <h1>
Get the best exchange rates from verified persons across the world.</h1>
          <Link className="footer-get-started-btn" to="/signup">
            Create An Accout
          </Link>
        </div>
      </div>
      <section className="desktop-flex">
        <div className="footer-navigation">
          <div className="link-group-1">
            <h3 className="link-group-title">Company</h3>
            <ul>
              <li>
                <Link className="footer-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/how-it-works">
                  How it works
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/news">
                  Market News
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/##">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="link-group-2">
            <h3 className="link-group-title">Legal</h3>
            <ul>
              <li>
                <Link className="footer-link" to="/##">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/##">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="footer-link" to="/##">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>

          <div className="social-link-group">
            <h3 className="link-group-title">Stay in touch</h3>
            <a href="/#" className="social-link-email">
              hello@troperial.com
            </a>
            <div className="social-icons-group">
              <a href="/twitter">
                <img src={twitter} alt="twitter" />
              </a>
              <a href="/facebook">
                <img src={facebook} alt="facebiook" />
              </a>
              <a href="/linkedin">
                <img src={linkedin} alt="linkedin" />
              </a>
              <a href="/instagram">
                <img src={instagram} alt="instagram" />
              </a>
            </div>
          </div>

          <div className="logo-group">
            <img src={logo} alt="troperial" />
            <p>&copy; Copyright 2020</p>
            <p>Troperial Technologies</p>
            <p>LLC. All rights reserved</p>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
