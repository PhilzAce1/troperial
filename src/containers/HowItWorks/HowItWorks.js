import React, {useState, useEffect} from 'react';
import './HowItWorks.css';
import HomeNavBar from '../../components/HomeNavBar/NavBar';
import signUpUiSvg from '../../assets/svgs/create-account.svg';
import tradeUiSvg from '../../assets/svgs/trading-card.svg';
import chatUiSvg from '../../assets/svgs/chat-platform.svg';
import check from '../../assets/svgs/green-check.svg';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade'
import XchangeRateBanner from '../XchangeRateBanner/XchangeRateBanner';
const HowItWorks = () => {
  const [visible, setVisible] = useState(false)
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    return currentScrollPos > 0 ? setVisible(true) :setVisible(false);
    
  };
  useEffect(()=> {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  })
  return (
    <section className="howItWorks__container">
      <header className="howItWorks__header">
      {visible ? <XchangeRateBanner position="fixed"/>: null}
        <HomeNavBar />
        <div className="page-introduction-title">
          <div>
          <Fade bottom>
            <h1>how troperial works</h1>
            <p>
              The quick, secure and fairer way to secure to exchange
              currencies across borders
            
            </p>
           
            <Link className="howItWorks_signup--btn" to="/signup">
              create an account
            </Link> 
            </Fade>
           
          </div>
        </div>
      </header>

      <main className="howItWorks__info-section">
        {/* desktop view !! */}
        <section className="howItWorks__desktop-images">
          <Slide left>
          <div className="card-1 platform-card">
            <img src={signUpUiSvg} alt="sign up ui" />
          </div>
          </Slide>
          <Slide left>
          <div className="card-2 platform-card">
            <img src={tradeUiSvg} alt="trade form" />
          </div>
          </Slide>
          <Slide left>
          <div className="card-3 platform-card">
            <img src={chatUiSvg} alt="chat platform" />
          </div>
          </Slide>
        </section>
        <section className="app_guide-section">
          <ul className="timeline">
            <li>
              <div className="item">
                <span className="timeline-icon green-check">
                  <img src={check} alt="timeline illustration" />
                </span>
                <div className="content">
                <Fade right cascade>
                <div>
                <h1>create an account</h1>
                  <p>
                    The first thing you need to do is to create a
                    Troperial account with your name, email, and
                    location. For Added security we also require a
                    phone number for two-factor authentication.
                  </p>
                </div>
                  </Fade>
                   </div>
              </div>
            </li>
            <li>
              <div className="item">
                <span className="timeline-icon green-check">
                  <img src={check} alt="timeline illustration" />
             </span>
                <div className="content">
                <Fade right cascade>
                <div>
                  <h1>verify your identity</h1>
                  <p>
                    The first thing you need to do is to create a
                    Troperial account with your name, email, and
                    location. For Added security we also require a
                    phone number for two-factor authentication.
                  </p>
                  <div className="card-1 platform-card">
                    <img src={signUpUiSvg} alt="sign up ui" />
                  </div>
                </div>
                </Fade>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <span className="timeline-icon ellipse">
  
                </span>
                <div className="content">
                <Fade right cascade>
                <div>
                  <h1>
                    select the currency you have &amp; would like to
                    recieve.
                  </h1>
                  <p>
                    The first thing you need to do is to create a
                    Troperial account with your name, email, and
                    location. For Added security we also require a
                    phone number for two-factor authentication.
                  </p>
                  </div>
                </Fade>
             
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <span className="timeline-icon ellipse">
      
                </span>
                <div className="content">
                <Fade right cascade>
                <div>
                  <h1>trade goes on FX Listings.</h1>
                  <p>
                    The first thing you need to do is to create a
                    Troperial account with your name, email, and
                    location. For Added security we also require a
                    phone number for two-factor authentication.
                  </p>
                  <div className="card-2 platform-card">
                    <img src={tradeUiSvg} alt="trade form" />
                  </div>
                </div>
                </Fade>
                </div>
              </div>
            </li>
            <li>
              <div className="item">
                <span className="timeline-icon ellipse">
        
                </span>
                <Fade right cascade>
                <div className="content">
              
                  <h1>we match you with a trusted trader</h1>
                  <p>
                    The first thing you need to do is to create a
                    Troperial account with your name, email, and
                    location. For Added security we also require a
                    phone number for two-factor authentication.
                  </p>
                </div>
                </Fade>
              </div>
            </li>
            <li>
              <div className="item">
                <span className="timeline-icon ellipse">
          
                </span>
                <Fade right cascade>
                <div className="content">
                  <h1>negotiate exchange rate and Trade.</h1>
                  <p>
                    The first thing you need to do is to create a
                    Troperial account with your name, email, and
                    location. For Added security we also require a
                    phone number for two-factor authentication.
                    <div className="card-3 platform-card">
                      <img src={chatUiSvg} alt="chat platform" />
                    </div>
                  </p>
                </div>
                </Fade>
              </div>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </section>
  );
};

export default HowItWorks;
