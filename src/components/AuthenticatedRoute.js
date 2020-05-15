import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { AppContext } from '../libs/contextLib';

export default function AuthenticatedRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useContext(AppContext);
  return (
    <Route {...rest}>
      {isAuthenticated === true ? (
        children
      ) : (
        <Redirect to={`/signin?redirect=${pathname}${search}`} />
      )}
    </Route>
  );
}
