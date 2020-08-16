import React from 'react';
import platformSvg from '../../../assets/svgs/platform-listings-group.svg';
import speech from '../../../assets/svgs/testimony-speech.svg';
import NGN from '../../../assets/flags/NGN.png';
import './RemarkSection.css';
const RemarkSection = () => {
    return (
       <section className="remark__section">
           <div className="slider_container">
                <h1 className="largeScreen-remark-heading">What people are saying.</h1>
                <div className="users_testimony">
                    <div className="users_testimony_speech_bubble">
                        <img className="speech" src={speech} alt="speech"/>
                        <h1 className="smallScreen-remark-heading">What people are saying</h1>
                    </div>
                   
    
                    <div className="user_testimony_container">
                        <p className="user_testimony">"I got a 10% salary increase when i started exchanging my US paycheck for Naira on Troperial where i avoided excess bank charges and got a better exchange rate."</p>
                        <div>
                        <p className="user_name">Yemi, <img src={NGN} alt="nigeria"/></p>
                    </div>

                </div>

                </div>
           </div>
           <div className="platform-svg">
               <img src={platformSvg} alt="listings ui"/>
           </div>
       </section>
    )
}

export default RemarkSection
