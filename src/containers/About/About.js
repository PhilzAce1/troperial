import React from 'react'
import './About.css';
import HomeNavBar from '../../components/HomeNavBar/NavBar';
import Footer from '../../components/Footer/Footer';
const About = () => {
    return (
        <section className="about__container">
        <header className="about__header">
          <HomeNavBar />
          <div className="page-introduction-title">
            <div className="flex-container">
                <p>What we believe</p>
              <h1 className="about-title">
                  We are passionate about building a better and fairer way of 
                  transferring money across the globe.
              </h1>
            </div>
          </div>
        </header>
        <section className="story__section">
          <div className="story">
              <h1 className="story_heading">The Troperial Story</h1>
              <p className="story_first-paragraph">
                  The past 5 years have delivered huge transformations in
                   online payments with the rise of the likes of Transferwise and Zelle among
                   many others. It's made business easier, but has come at the price of adding 
                   overly-expensive layers that clutter the currency exchange experience.
                   with an incredible team boasting experience from the likes of Goldman Sachs and 
                   Cisco we founded Troperial.
              </p>
              <p className="story_second-paragraph">
                  We offer a complete but evolving payments experience designed for
                  quicker more secure and fairer ways to exchange currencies across borders.
              </p>
          </div>
          <div className="largeScreen-vision vision">
              <h1>Our Vision</h1>
              <p>"A comprehensive financial solution system to ease people's access to their money."</p>
          </div>
        </section>
        <section className="team">
            <div className="team_container">
                <h1 className="team_heading">Our Team</h1>
                <main className="team_grid">
                    <div className="teamMate">
                        <img className="teamMate_image" src="" alt=""/>
                        <h1 className="teamMate_name">Bosun Gidigbi</h1>
                        <h2 className="teamMate_role">Technical Manager &amp; Co-founder</h2>
                        <p className="teamMate_desc">Fearlessly leading our engineering team and is reponsible for Troperial's underlying technology. Bosun's focus is on data acquisition, with a passion for backend architecture and infrastructure</p>
                    </div>
                    <div className="teamMate">
                        <img className="teamMate_image" src="" alt=""/>
                        <h1 className="teamMate_name">Olu Akinbayo</h1>
                        <h2 className="teamMate_role">General Manager &amp; Co-founder</h2>
                        <p className="teamMate_desc">Fearlessly leading our engineering team and is reponsible for Troperial's underlying technology. Bosun's focus is on data acquisition, with a passion for backend architecture and infrastructure</p>
                    </div>
                </main>
            </div>
            <div className="smallerScreen-vision vision">
            <h1>Our Vision</h1>
              <p>"A comprehensive financial solution system to ease people's access to their money."</p>
            </div>
        </section>
        <Footer />
      </section>
    )
}

export default About
