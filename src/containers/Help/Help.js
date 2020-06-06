import React from 'react';
import './Help.css';

import HomeNavBar from '../../components/HomeNavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import check from '../../assets/svgs/email-icon.svg';
import Accordion from '../../components/Accordion/Accordion';


const Help = () => {
  return (
    <section className="help__container">
      <header className="help__header">
        <HomeNavBar />
        <div className="page-introduction-title">
          <div>
            <h1 className="help-title">Help &amp; advice from the Troperial Team</h1>
            <form className="help__search">
                <input type="text" placeholder="search" className="help__search--form"/>
            </form>
          </div>
        </div>
      </header>
      <section className="faq__section">
     <div className="accordion-group">
     <Accordion/>
        <Accordion/>
        <Accordion/>
        <Accordion/>
        <Accordion/>
     </div>

         <div className="send__email--section">
             <p>Don't see your question here?</p>
         <div className="send_email-button">
             <img src={check} alt="send a mail"/><br/>
            <button className="send-us-mail">send us a mail</button>
</div>
         </div>
      </section>
      <Footer />
    </section>
  );
};

export default Help;
