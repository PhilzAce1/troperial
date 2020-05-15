import React from 'react';
import './Hero.css';
import img from '../../assets/images/money-bag.png';
const Hero = () => {
  return (
    <header className="heroHeader">
      {/* text */}
      <div className="heroHeader__introDiv">
        <h1>
          Exhange <span className="troperial-green">money</span> <img src={img} alt="bag" />, wherever you are!
        </h1>
        <p>
          The quick, secure and fairer way to exchange currencies
          across borders
        </p>
      </div>
      {/* form */}
      <div className="heroHeader__formDiv">
      </div>
    </header>
  );
};

export default Hero;
