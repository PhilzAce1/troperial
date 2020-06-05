import React from 'react';
import './Hero.css';
import PostTrade from '../../../components/PostTrade/PostTrade';
import moneyBagSvg from '../../../assets/images/money-bag.png';
import HomeNavBar from '../../../components/HomeNavBar/NavBar';
import XchangeRateBanner from '../../XchangeRateBanner/XchangeRateBanner';
const Hero = () => {
    return (
        <header className="landing__page-header">
            <div className="lightblue-overlay"></div>
            {/* <XchangeRateBanner/> */}
            <HomeNavBar/>
          <div className="landing__page--main">
          <div className="landing__page--intro">
                <h1>Exchange <span className="green-text">Currencies</span> <img className="moneyBagIcon" src={moneyBagSvg} alt="money"/><br/> at Your Preffered Rate</h1>
                <p>The quicker, more secure and fairer way to exchange currencies across borders </p>
            </div>
            <div className="landing__page--Trade-container">
                <div className="postTrade__card">
                    <PostTrade title="what currency do you need?"/>
                </div>
            </div>
          </div>
        </header>
    )
}
export default Hero;
