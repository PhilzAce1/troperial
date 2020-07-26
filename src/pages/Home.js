import React, { Fragment } from 'react';
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