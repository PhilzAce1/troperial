import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../libs/contextLib';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import {connect} from 'react-redux';
import {checkUserProfile} from '../actions/authActions';

const Dashboard = ({checkUserProfile}) => {
  const [user, setUser] = useState(null);
  const history = useHistory();
  const { userHasAuthenticated } = useContext(AppContext);
  useEffect(() => {
    checkUserProfile();
    const getUserData = async () => {
      const data = await Auth.currentAuthenticatedUser();
      setUser(data.attributes.email);
    };
    getUserData();
  }, [checkUserProfile]);

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push('/');
  }
  return (
    <div>
      <button onClick={handleLogout}>logout</button>
      {user && (
        <div>
          <h1>Welcome {user}</h1>
        </div>
      )}
    </div>
  );
};
// const mapStateToProps = (state) => ({

// })
export default connect(null, {checkUserProfile})(Dashboard);
