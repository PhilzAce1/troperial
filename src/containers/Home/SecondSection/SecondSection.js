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
          No matter the FX need you have, Troperial was designed to
          work for you.
        </p>
      </div>

      <main className="users__showcase">
        <div className="horizontal__scroll--container">
          <Slide right>
            <div className="card-1 card">
              <p>
                "Carrying out business across borders has been made
                easy for me because I can exchange my naira for
                dollars and spend it however I wish."
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
                "I get more from my allowance from using troperial to
                trade fx and save on extra fees."
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
                "I can now exchange my fx on my own and send the money
                back home to my parents without using black markets."
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
