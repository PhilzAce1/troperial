import React from 'react'
import './SecondSection.css';

import person1 from '../../../assets/svgs/testimonial-1.svg';
import person2 from '../../../assets/svgs/testimonial-2.svg';
import person3 from '../../../assets/svgs/testimonial-3.svg';
const SecondSection = () => {
    return (
        <section className="secondSection">
          <div className="header">
          <h1>Designed &amp; Built just for you.</h1>
          <p>
            No matter the FX need you have, Troperial was designed to
            work for you.
          </p>
        </div>


       <main className="users__showcase">
       <div className="horizontal__scroll--container">
            <div className="card-1 card">
              <p>"I want to send money to my family fast"</p>
                <img className="card-1__img" src={person1} alt="person"/>
            </div>
            <div className="card-2 card">
              <p>
                "I have some dormant cash, I want to put it to work."
              </p>
              <img className="card-2__img" src={person2} alt="person"/>
            </div>
            <div className="card-3 card">
              <p>
                "I'm in a new country and i just want to make a quick
                currency exchange."
              </p>
              <img className="card-3__img" src={person3} alt="person"/>
            </div>
          </div>
       </main>

        </section>
    )
}

export default SecondSection
