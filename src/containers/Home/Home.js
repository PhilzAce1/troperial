import React from 'react';

import FourthSection from './FourthSection/FourthSection';
import RemarkSection from './RemarkSection/RemarkSection';
import SecondSection from './SecondSection/SecondSection';
import ThirdSection from './ThirdSection/ThirdSection';
import FifthSection from './FifthSection/FifthSection';
import Footer from '../../components/Footer/Footer';
import Hero from './Hero/Hero';
const Home = () => {
  return (
    <div>
      <Hero/>
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <RemarkSection />
      <FifthSection />
      <Footer />
    </div>
  );
};

export default Home;
