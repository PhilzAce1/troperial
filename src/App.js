import React from 'react';
import Routes from './Routes';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Notifications } from 'react-push-notification';
import './App.css';
const App = () => {
  return (
    <Provider store={store}>
      <Notifications />
      <Router>
        <Routes />
      </Router>
    </Provider>
  );
};
export default App;
