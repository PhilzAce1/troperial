import React, { useState } from 'react';
import Notification from '../../components/Notification/Notification';
import Container from '../../components/Container/Container';
import BackDrop from '../../components/BackDrop/BackDrop';
import AppAside from '../../components/AppAside/AppAside';
import AppMain from '../../components/AppMain/AppMain';
import NavBar from '../../components/NavBar/NavBar';

import './Notifications.css';
import PaddedContainer from '../../components/PaddedContainer/PaddedContainer';

const Notifications = () => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const handleBackDrop = () => {
    const show = showBackDrop;
    setShowBackDrop(!show);
  };
  return (
    <Container showBackDrop={showBackDrop}>
      <NavBar page="Notifications" icon="icon-notifications"/>
      {showBackDrop ? <BackDrop handleBackDrop={handleBackDrop}/> : null}
      <div className="notificationsCustom__container">
        <AppAside onClick={handleBackDrop}/>
        <AppMain>
         <PaddedContainer padding="25px">
         <h2>Notifications</h2>
          <div className="notifications-list">
          <Notification />
          <Notification />
          <Notification />
          <Notification />
          </div>
         </PaddedContainer>
        </AppMain>
      </div>
    </Container>
  );
};
export default Notifications;
