import React, { Fragment } from 'react';
//import NavBar from '../components/NavBar/NavBar';
// import Hero from '../components/Hero/Hero';

import HomeNavBar from '../components/HomeNavBar/NavBar';
import HomeContainer from '../containers/HomeContainer/HomeContainer';
const Home = () => {
  return (
    <Fragment>
      <HomeNavBar/>
      <HomeContainer/>
    </Fragment>
  );
};
export default Home;