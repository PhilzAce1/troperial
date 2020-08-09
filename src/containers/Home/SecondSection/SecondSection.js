import React from 'react';
import './SecondSection.css';

import person1 from '../../../assets/images/person1.png';
import person2 from '../../../assets/images/person2.png';
import person3 from '../../../assets/images/person3.png';

import Slide from 'react-reveal/Slide';
const SecondSection = () => {
  return (
    <section className="secondSection">
      <div className="header">
        <h1>Designed &amp; Built just for you.</h1>
        <p>
          We designed Troperial for you and your FX needs.
        </p>
      </div>

      <main className="users__showcase">
        <div className="horizontal__scroll--container">
          <Slide right>
            <div className="card-1 card">
              <p>
                "I need to pay my Child's school fees without excess charges and at a good rate."
              </p>
              <img
                className="card-1__img"
                src={person1}
                alt="person"
              />
            </div>
          </Slide>
          <Slide right>
            <div className="card-2 card">
              <p>
                "I need a better exchange rate when sending money to my family."
              </p>
              <img
                className="card-2__img"
                src={person2}
                alt="person"
              />
            </div>
          </Slide>
          <Slide right>
            <div className="card-3 card">
              <p>
                "I'm new in the US, and need to change my Naira to Dollars."
              </p>
              <img
                className="card-3__img"
                src={person3}
                alt="person"
              />
            </div>
          </Slide>
        </div>
      </main>
    </section>
  );
};

export default SecondSection;
