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
const Profile = () => {
  useEffect(() => {
    getUserDetails();
  }, []);

  const [fetched, setFetched] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phone: '',
  });

  const getUserDetails = async () => {
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      let personId = currentUserInfo.attributes['custom:personId'];
      if (!personId) {
        return null;
      }
      const user = await axios.get(
        `https://persons.api.troperial.com/persons/${personId}`,
      );
      const {
        firstName,
        lastName,
        userAlias,
        phoneNumbers,
      } = user.data;
      const { number } = phoneNumbers[0];
      setDefaultValues({
        firstname: firstName,
        lastname: lastName,
        username: userAlias,
        phone: number,
      });
      setFetched(true);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeHandler = (e) => {
    setDefaultValues({
      ...defaultValues,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container>
      <NavBar page="Profile" icon="icon-profile" />
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
                  onChangeHandler={onChangeHandler}
                />
              </PaddedContainer>
            </TabPanel>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <History />
              </PaddedContainer>
            </TabPanel>
            <TabPanel>
              <PaddedContainer padding="0 25px 25px 25px">
                <BankAccount />
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
