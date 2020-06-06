import React from 'react';
import platformSvg from '../../../assets/svgs/platform-listings-group.svg';
import speech from '../../../assets/images/Vector.png';
import './RemarkSection.css';
const RemarkSection = () => {
    return (
       <section className="remark__section">
           <div className="slider_container">
                <h1 className="largeScreen-remark-heading">What people are saying</h1>
                <div>
                    <div>
                        <img  className="speech" src={speech} alt="speech"/>
                        <h1 className="smallScreen-remark-heading">What people are saying</h1>
                    </div>
                   
                    <div>
                        <p>"This is so cool tho"</p>
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
