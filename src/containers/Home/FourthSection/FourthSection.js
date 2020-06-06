import React from 'react'
import './FourthSection.css';
import fast from  '../../../assets/svgs/thunder-bolt.svg';
import simple from  '../../../assets/svgs/phone-action.svg';
import safe from  '../../../assets/svgs/thunder-bolt.svg';
import card from  '../../../assets/svgs/phone-action.svg';
import Slide from 'react-reveal/Slide';
const FourthSection = () => {
    return (
        <section className="fouthSection">
                <h1 className="heading">Why choose Troperial</h1>
          
                <div className="grid">
                <Slide right>
                    <div className="grid-item">
                        <img src={fast} alt="fast"/>
                        <h1>it's fast</h1>
                        <p>get the latest and hottest market news about currency and other things on Troperial</p>
                    </div>
                    </Slide>
                    <Slide right>
                    <div className="grid-item">
                        <img src={simple} alt="simple"/>
                        <h1>it's simple</h1>
                        <p>get the latest and hottest market news about currency and other things on Troperial</p>
                    </div>
                    </Slide>
                    <Slide right>
                    <div className="grid-item">
                        <img src={card} alt="card"/>
                        <h1>Absolutely no fees</h1>
                        <p>get the latest and hottest market news about currency and other things on Troperial</p>
                    </div>
                    </Slide>
                    <Slide right>
                    <div className="grid-item">
                        <img src={safe} alt="safe"/>
                        <h1>it's safe</h1>
                        <p>get the latest and hottest market news about currency and other things on Troperial</p>
                    </div>
                    </Slide>
                </div>

        </section>
    )
}

export default FourthSection
