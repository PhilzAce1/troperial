import React from 'react';
import './Hero.css';
import PostTrade from '../../../components/PostTrade/PostTrade';
import moneyBagSvg from '../../../assets/images/money-bag.png';
import HomeNavBar from '../../../components/HomeNavBar/NavBar';
//import XchangeRateBanner from '../../XchangeRateBanner/XchangeRateBanner';
import Fade from 'react-reveal/Fade';
import {ToastContainer} from 'react-toastify'
import WaitListForm from '../../WaitListForm/WaitListForm';
const Hero = () => {
  // const [visible, setVisible] = useState(false)
  // const handleScroll = () => {
  //   const currentScrollPos = window.pageYOffset;
  //   return currentScrollPos > 0 ? setVisible(true) :setVisible(false);

  // };
  // useEffect(()=> {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   }
  // })
  return (
    <div>
     <ToastContainer/>
      <header className="landing__page-header">
        <div className="lightblue-overlay"></div>
        {/* {visible ? <XchangeRateBanner position="fixed"/>: null} */}
        <HomeNavBar />
        <div className="landing__page--main">
          <div className="landing__page--intro">
            <div>
              <Fade bottom>
                <h1>
                  Exchange{' '}
                  <span className="green-text">Currencies</span>{' '}
                  <img
                    className="moneyBagIcon"
                    src={moneyBagSvg}
                    alt="money"
                  />
                  <br /> at Your Preferred Rate
                </h1>
              </Fade>
              <Fade bottom>
                <p>
                  A fairer and faster way to exchange currencies
                  across borders.
                </p>
              </Fade>
            </div>
          </div>
          <div className="landing__page--Trade-container">
            <div className="postTrade__card">
              <PostTrade
                title="what currency do you need?"
                showCheckBox={false}
                showCloseBtn={false}
              />
              {/* <WaitListForm/> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Hero;
