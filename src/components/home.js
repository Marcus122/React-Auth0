import React, { Component,PropTypes } from 'react';
import AuthService from '../utils/AuthService';

export default class Home extends Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }
  render() {
    const {auth} = this.props;
    const login = <button className="btn btn-primary" onClick={auth.login.bind(this)}>Login</button>;
    const logout = <button className="btn btn-danger" onClick={auth.logout.bind(this)}>Logout</button>;
    return (
      <div>
        {auth.loggedIn() ? logout: login}
      </div>
    );
  }
}