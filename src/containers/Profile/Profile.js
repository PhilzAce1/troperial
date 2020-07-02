import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import AppAside from '../../components/AppAside/AppAside';
import AppMain from '../../components/AppMain/AppMain';
import Container from '../../components/Container/Container';
import NavBar from '../../components/NavBar/NavBar';
import Account from './Account';
import History from './History';
import BankAccount from './BankAccount';
import Verification from './Verification';
import TrustedTraders from './TrustedTraders';
import './Profile.css';
import PaddedContainer from '../../components/PaddedContainer/PaddedContainer';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import BackDrop from '../../components/BackDrop/BackDrop';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

const Profile = () => {
  useEffect(() => {
    getUserDetails();
  }, []);

  const [fetched, setFetched] = useState(false);
  const [controlView, setControlView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showBackDrop, setShowBackDrop] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phone: '',
    email: ''
  });

  const getUserDetails = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      let personId = currentUserInfo.attributes['custom:personId'];
      if (!personId) {
        return null;
      }
      const user = await axios.get(
        `https://persons.api.troperial.com/persons/${personId}`,
      {
        headers: {
          Authorization: authToken,
        },
      });
      const {
        firstName,
        lastName,
        userAlias,
        phoneNumbers,
        emailAddresses
      } = user.data;
      const { number } = phoneNumbers[0];
      const { email } = emailAddresses[0];
      setDefaultValues({
        firstname: firstName,
        lastname: lastName,
        username: userAlias,
        phone: number,
        email,
      });
      setFetched(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleBackDrop = () => {
    setShowBackDrop(!showBackDrop)
    setControlView(!controlView);
  };
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
    setControlView(!controlView);
  };

  return (
    <Container showBackDrop={controlView}>
      <NavBar page="Profile" icon="icon-profile" />
            {showBackDrop ? (
        <BackDrop renderBankAccoutForm={true} handleBackDrop={handleBackDrop} />
      ) : null}
      {showDelete ? (
        <DeleteModal handleClose={handleDeleteModal} />
      ) : null}
      <div className="listingsCustom__container">
        <AppAside />
        <AppMain>
          <Tabs>
            <div className="tab_list-container">
              <TabList>
                <div className="scrolling-wrapper">
                  <Tab>Account</Tab>
                  <Tab>History</Tab>
                  <Tab>Bank Accounts</Tab>
                  <Tab>Security &amp; Verification</Tab>
                  <Tab>Trusted Traders</Tab>
                </div>
              </TabList>
            </div>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <Account
                  fetched={fetched}
                  defaultValues={defaultValues}
                  getUserDetails={getUserDetails}
                />
              </PaddedContainer>
            </TabPanel>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <History handleDeleteModal={handleDeleteModal}/>
              </PaddedContainer>
            </TabPanel>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <BankAccount handleBackDrop={handleBackDrop}/>
              </PaddedContainer>
            </TabPanel>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <Verification />
              </PaddedContainer>
            </TabPanel>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <TrustedTraders />
              </PaddedContainer>
            </TabPanel>
          </Tabs>
        </AppMain>
      </div>
    </Container>
  );
};

export default Profile
