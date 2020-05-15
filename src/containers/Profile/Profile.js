import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AppAside from '../../components/AppAside/AppAside';
import AppMain from '../../components/AppMain/AppMain';
import Container from '../../components/Container/Container';
import NavBar from '../../components/NavBar/NavBar';
const Profile = () => {
  return (
    <Container>
      <NavBar page="Profile" icon="fas fa-align-justify" />
      <AppAside />
      <AppMain>
        <Tabs>
          <TabList>
            <Tab>All Listings</Tab>
            <Tab>My Listings</Tab>
          </TabList>
          <TabPanel>All Listings</TabPanel>
          <TabPanel>My Listings</TabPanel>
        </Tabs>
      </AppMain>
    </Container>
  );
};

export default Profile;
