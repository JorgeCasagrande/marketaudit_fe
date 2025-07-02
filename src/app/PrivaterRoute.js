import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {routes} from './Routes';
import {isUserStored} from 'helpers/AuthenticationHelper';

const PrivateRoute = ({render, ...rest}) => (
  <Route {...rest} render={() => (
    isUserStored()
    ? render()
    : <Redirect to={routes.login}/>
  )} />
);

export default PrivateRoute;