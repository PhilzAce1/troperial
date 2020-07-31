import React from 'react';
import './About.css';
import HomeNavBar from '../../components/HomeNavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import XchangeRateBanner from '../XchangeRateBanner/XchangeRateBanner';

const About = () => {
  return (
    <section className="about__container">
      <header className="about__header">
        <XchangeRateBanner />
        <HomeNavBar />
        <div className="page-introduction-title">
          <div className="flex-container">
            <p>What we believe</p>
            <h1 className="about-title">
              To build a better and fairer way of transferring money
              accross the globe.
            </h1>
          </div>
        </div>
      </header>
      <section className="story__section">
        <div className="story">
          <h1 className="story_heading">The Troperial Story</h1>
          <p className="story_first-paragraph">
            In the past years, we have witnessed a large disruption in
            the mobile money and transfers sect. These new changes
            have made business transactions easier, although at a high
            cost to some. This is whereTroperial says 'I'm here to
            help'. Working with our team of experts, Troperial was
            created to fix the problem of high transaction costs and
            the divide between traders.
          </p>
          <p className="story_second-paragraph">
            Here at Troperial, we offer an ever-evolving payment
            experience designed to foster quicker and fairer ways to
            exchange currencies, and the good part is, it's all at
            your prefered rate.
          </p>
        </div>
        <div className="largeScreen-vision vision">
          <h1>Our Vision</h1>
          <p>
            "A comprehensive financial solution system to ease
            people's access to their money."
          </p>
        </div>
      </section>
      <section className="team">
        <div className="team_container">
          <h1 className="team_heading">Our Team</h1>
          <main className="team_grid">
            <div className="teamMate">
              <img className="teamMate_image" src="" alt="" />
              <h1 className="teamMate_name">Bosun Gidigbi</h1>
              <h2 className="teamMate_role">
                Technical Manager &amp; Co-founder
              </h2>
              <p className="teamMate_desc">
                Fearlessly leading our engineering team and is
                reponsible for Troperial's underlying technology.
                Bosun's focus is on data acquisition, with a passion
                for backend architecture and infrastructure
              </p>
            </div>
            <div className="teamMate">
              <img className="teamMate_image" src="" alt="" />
              <h1 className="teamMate_name">Olu Akinbayo</h1>
              <h2 className="teamMate_role">
                General Manager &amp; Co-founder
              </h2>
              <p className="teamMate_desc">
                Fearlessly leading our engineering team and is
                reponsible for Troperial's underlying technology.
                Bosun's focus is on data acquisition, with a passion
                for backend architecture and infrastructure
              </p>
            </div>
          </main>
        </div>
        <div className="smallerScreen-vision vision">
          <h1>Our Vision</h1>
          <p>
            "A comprehensive financial solution system to ease
            people's access to their money."
          </p>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default About;
