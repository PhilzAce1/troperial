import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AppAside from '../../components/AppAside/AppAside';
import AppMain from '../../components/AppMain/AppMain';
import Container from '../../components/Container/Container';
import NavBar from '../../components/NavBar/NavBar';
import Account from './Account';
import History from './History';
import BankAccount from './BankAccount';
import './Profile.css';
const Profile = () => {
  return (
    <Container>
      <NavBar page="Profile" icon="fas fa-align-justify" />
      <div className="listingsCustom__container">
      <AppAside />
      <AppMain>
        <Tabs>
          <TabList>
            <div className="scrolling-wrapper">
            <Tab>Account</Tab>
            <Tab>History</Tab>
            <Tab>Bank Accounts</Tab>
            <Tab>Security &amp; Verification</Tab>
            <Tab>Trusted Traders</Tab>
            </div>
          </TabList>
          <TabPanel>
            <Account/>
          </TabPanel>
          <TabPanel>
            <History/>
          </TabPanel>
          <TabPanel>
            <BankAccount/>
          </TabPanel>
          <TabPanel>My Listings</TabPanel>
          <TabPanel>My Listings</TabPanel>
        </Tabs>
      </AppMain>
      </div>
    </Container>
  );
};

export default Profile;
