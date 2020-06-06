import React, { Fragment } from 'react';

import FourthSection from './FourthSection/FourthSection';
import RemarkSection from './RemarkSection/RemarkSection';
import SecondSection from './SecondSection/SecondSection';
import ThirdSection from './ThirdSection/ThirdSection';
import FifthSection from './FifthSection/FifthSection';
import Footer from '../../components/Footer/Footer';
import Hero from './Hero/Hero';
const Home = () => {
  return (
    <Fragment>
      <Hero />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <RemarkSection />
      <FifthSection />
      <Footer />
    </Fragment>
  );
};

export default Home;
