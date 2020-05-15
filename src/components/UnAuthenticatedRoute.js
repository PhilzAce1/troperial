import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../libs/contextLib';

export default function UnauthenticatedRoute({ children, ...rest }) {
  function querystring(name, url = window.location.href) {
    name = name.replace(/[[]]/g, '\\$&');

    const regex = new RegExp(
      '[?&]' + name + '(=([^&#]*)|&|#|$)',
      'i',
    );
    const results = regex.exec(url);

    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
  const { isAuthenticated } = useContext(AppContext);
  const redirect = querystring('redirect');
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={
            redirect === '' || redirect === null
              ? '/listings'
              : redirect
          }
        />
      )}
    </Route>
  );
}