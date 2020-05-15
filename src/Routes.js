import React from 'react';
import { Switch } from 'react-router-dom';
import UnauthenticatedRoute from './components/UnAuthenticatedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NotificationsPage from './pages/NotificationsPage';
import ForgotPassword from './pages/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import ListingsPage from './pages/ListingsPage';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import LogIn from './pages/Login';
import Home from './pages/Home';
const Routes = () => {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/">
        <Home />
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
      <AuthenticatedRoute exact path="/profile">
        <ProfilePage/>
      </AuthenticatedRoute>
    </Switch>
  );
};
export default Routes;
