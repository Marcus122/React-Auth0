import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AuthService from 'utils/AuthService';

import App from './components/app';
import Home from './components/home';
import Profile from './components/profile';
import Login from './components/login';

const auth = new AuthService('7kXfnR65i6pMiRPN7N7fWLAjlqlCflqZ', 'marcusatty.eu.auth0.com');

// onEnter callback to validate authentication in private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="profile" component={Profile} onEnter={requireAuth}/>
        <Route path="login" component={Login}/>
    </Route>
);