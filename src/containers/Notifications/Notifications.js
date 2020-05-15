import React, { useState } from 'react';
import Notification from '../../components/Notification/Notification';
import Container from '../../components/Container/Container';
import BackDrop from '../../components/BackDrop/BackDrop';
import AppAside from '../../components/AppAside/AppAside';
import AppMain from '../../components/AppMain/AppMain';
import NavBar from '../../components/NavBar/NavBar';
import './Notifications.css';

const Notifications = () => {
  const [showBackDrop, setShowBackDrop] = useState(false);
  const handleBackDrop = () => {
    const show = showBackDrop;
    setShowBackDrop(!show);
  };
  return (
    <Container showBackDrop={showBackDrop}>
      <NavBar page="Notifications" icon="fas fa-bell"/>
      {showBackDrop ? <BackDrop handleBackDrop={handleBackDrop}/> : null}
      <div className="notificationsCustom__container">
        <AppAside onClick={handleBackDrop}/>
        <AppMain>
          <h2>Notifications</h2>
          <Notification />
          <Notification />
          <Notification />
          <Notification />
        </AppMain>
      </div>
    </Container>
  );
};
export default Notifications;
