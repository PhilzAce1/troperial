import React from 'react'
import './FourthSection.css';
import fast from  '../../../assets/svgs/thunder-bolt.svg';
import simple from  '../../../assets/svgs/phone-action.svg';
import safe from  '../../../assets/svgs/thunder-bolt.svg';
import card from  '../../../assets/svgs/phone-action.svg';
import Fade from 'react-reveal/Fade';
const FourthSection = () => {
    return (
        <section className="fouthSection">
                <h1 className="heading">Why choose Troperial</h1>
          
                <div className="grid">
                <Fade bottom>
                    <div className="grid-item">
                        <img src={fast} alt="fast"/>
                        <h1>It's fast</h1>
                        <p>Complete a transaction in three steps - Post, Negotiate, Transact</p>
                    </div>
                    </Fade>
                    <Fade bottom>
                    <div className="grid-item">
                        <img src={simple} alt="simple"/>
                        <h1>It's simple</h1>
                        <p>very easy to use</p>
                    </div>
                    </Fade>
                    <Fade bottom>
                    <div className="grid-item">
                        <img src={card} alt="card"/>
                        <h1>Absolutely no fees</h1>
                        <p>Zero charges</p>
                    </div>
                    </Fade>
                    <Fade bottom>
                    <div className="grid-item">
                        <img src={safe} alt="safe"/>
                        <h1>It's safe</h1>
                        <p>we guarantee the highest levels of Internet Security, and security encryption to ensure that your information is completely protected from fraud. everyone is verified.</p>
                    </div>
                    </Fade>
                </div>

        </section>
    )
}

export default FourthSection
