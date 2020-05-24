import React, { Fragment } from 'react';
/**
 * CUSTOM COMPONENTS
 */
import HybridInput from '../../components/HybridInput/HybridInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import PostTrade from '../../components/PostTrade/PostTrade';
import NewsCard from '../../components/NewsCard/NewsCard';
import AppFooter from '../../components/Footer/Footer';

/**
 * THIRD PARTY PACKAGES
 */
import { Link } from 'react-router-dom';
/**
 * SVG/IMAGES/ICONS IMPORTS
 */
import img from '../../assets/images/money-bag.png';
import desktopSvg from '../../assets/svgs/Group.svg';
import boyUser from '../../assets/svgs/boy-user.svg';
import girlUser from '../../assets/svgs/girl-user.svg';
import bypass1 from '../../assets/svgs/bypass-1.svg';
import bypass2 from '../../assets/svgs/bypass-2.svg';
import remark from '../../assets/images/Vector.png';
import exchangeLogo from '../../assets/svgs/exchange-troperial-logo.png';

const Hero = () => {
  return (
    <Fragment>
      {/**************HERO SECTION STARTS HERE****************/}
      <section className="hero__container">
        <div className="intro">
          <div className="flex_wrapper">
            <h1>
              Exhange <span className="troperial-green">money</span>{' '}
              <img src={img} className="home-money-icon" alt="bag" />,
              <br />
              wherever you are!
            </h1>
            <p>
              The quick, secure and fairer way to exchange currencies
              across borders
            </p>
          </div>
        </div>
        <main className="home-trade-section">
          <div className="home-trade-section-container">
            <div className="home-dotted-bg"></div>
            <div className="post-trade">
              <PostTrade />
            </div>
          </div>
        </main>
      </section>
      {/**************HERO SECTION ENDS HERE****************/}

      {/**************DETAILS SECTION STARTS HERE****************/}
      <section className="details-section">
        <div className="header">
          <h1>Connecting buyers with trusted traders.</h1>
          <p>
            We connect buyers and trusted traders, starting the right
            conversation that leads to an exchange
          </p>
          <Link to="/#" className="learn__more">
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
          <img
            className="exchange-troperial-logo"
            src={exchangeLogo}
            alt="exchange troperial logo"
          />
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
          <div className="grid">
            <h1>Buyer</h1>
            <p>
              We connect buyers and traders, starting the right
              conversation that leads to an exchange
            </p>
          </div>
          <div className="grid">
            <h1>Platform</h1>
            <p>
              We connect buyers and traders, starting the right
              conversation that leads to an exchange
            </p>
          </div>
          <div className="grid">
            <h1>FX Trader</h1>
            <p>
              We connect buyers and traders, starting the right
              conversation that leads to an exchange
            </p>
          </div>
        </div>
      </section>
      {/**************HERO SECTION END HERE****************/}

      <section className="convince-visitor-section">
        <div className="convice-visitor-header">
          <h1>Design and Built just for you.</h1>
          <p>
            No matter the FX need you have, Troperial was designed to
            work for you.
          </p>
        </div>
        <div className="users-comments-grid">
          <div className="horizonal-scrolling-div">
            <div className="first-comment comment">
              <p>"I want to send money to my family fast"</p>
            </div>
            <div className="second-comment comment">
              <p>
                "I have some dormant cash, I want to put it to work."
              </p>
            </div>
            <div className="third-comment comment">
              <p>
                "I'm in a new country and i just want to make a quick
                currency exchange."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONVINCE VISITORS */}
      <div className="convince-user-to-get-started">
        <div className="get-started-header">
          <h1>Get the best exchange rate from trusted traders.</h1>
          <p>
            With Troperial you get to negotiate and get the best
            exchange rates and deals in the FX market.
          </p>
          <Link className="get-started-btn" to="/signup">
            Get started
          </Link>
        </div>
        <div className="convince-plaform-interface-container">
          <div className="convince-plaform-interface-dotted-bg"></div>
          <div className="platform-inteface">
            <div className="convo-card">
              <img
                className="user-1"
                src={girlUser}
                alt="girl user svg"
              />
              <img
                className="user-2"
                src={boyUser}
                alt="boy user svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="user-remark-plaform-component">
          <div className="dotted-bg"></div>
          <div className="empty-plaform-container">
            <div className="exchange-exhibit">
              <p className="exchange-exhibit-value">$1000</p>
              <p className="exchange-exhibit-value">NGN 28744</p>
            </div>
          </div>
      </div> */}

      <section className="user-remarks">
        {/*  */}

        {/*  */}
        <div className="user-remark">
          <h1 className="remark-header-desktop">
            What People are saying
          </h1>
          <div className="remark-flex-container">
            <div>
              <img
                className="remark-icon"
                src={remark}
                alt="remark"
              />
              <h1 className="remark-header-mobile">
                What People are saying
              </h1>
            </div>
            <div className="review-container">
              <p>
                Troperial is great at making quick and secure foreign
                exchange
              </p>
              <div className="user-info-container">
                <img
                  className="user-image"
                  src={boyUser}
                  alt="boy user"
                />
                <span className="user">David</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="news_section">
        <div className="header">
          <h1>The Latest market news</h1>
          <p>
            Get the latest and hottest market news about currency and
            other things on Troperial
          </p>
          <Link className="get-learn-more" to="/news">
            Learn More
          </Link>
        </div>
        <div className="news_container">
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </div>
      </section>
      <AppFooter/>
    </Fragment>
  );
};

export default Hero;
