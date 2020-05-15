import React from 'react';
import Routes from './Routes';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
const App = () => {
  return (
      <Provider store={store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
  );
};
export default App;
