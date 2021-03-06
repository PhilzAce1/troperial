import React, { useEffect, useCallback } from 'react';
import { Switch } from 'react-router-dom';
import UnauthenticatedRoute from './components/UnAuthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NotificationsPage from './pages/NotificationsPage';
import ForgotPassword from './pages/ForgotPassword';
import HowItWorksPage from './pages/HowItWorksPage';
import ProfilePage from './pages/ProfilePage';
import LandingPage from './pages/LandingPage';
import ListingsPage from './pages/ListingsPage';
import Dashboard from './pages/Dashboard';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';
import SignUp from './pages/SignUp';
import LogIn from './pages/Login';
import { connect } from 'react-redux';
import { checkUserProfile } from './actions/authActions';

import ChatPage from './pages/ChatPage';
import NewsPage from './pages/NewsPage';
import {Auth} from 'aws-amplify';
import { getAllRates } from './actions/transactionActions';

const Routes = ({ checkUserProfile, getAllRates }) => {
  const callBack = useCallback(() => {
    refreshToken();
    setInterval(refreshToken, 1800000);
 }, [])
  useEffect(() => {
    callBack()
    checkUserProfile();
  
  }, [checkUserProfile, callBack]);


  const refreshToken = async () =>  {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = cognitoUser.signInUserSession;
      cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
        // // do something with the new session
        // console.log(session.idToken.jwtToken)
        localStorage.setItem('authToken', session.idToken.jwtToken);
      });
    } catch (e) {
      console.log(e, 'Unable to refresh token')
    }

  }

  return (
    <Switch>
      <UnauthenticatedRoute exact path="/">
        <LandingPage />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/news">
        <NewsPage/>
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signin">
        <LogIn />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <SignUp />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/forgotpassword">
        <ForgotPassword />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/listings">
        <ListingsPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/notifications">
        <NotificationsPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/messages">
        <ChatPage />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/profile">
        <ProfilePage />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/how-it-works">
        <HowItWorksPage />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/help">
        <HelpPage />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/about">
        <AboutPage />
      </UnauthenticatedRoute>
    </Switch>
  );
};
export default connect(null, { checkUserProfile, getAllRates })(Routes);
