import React, { Component,PropTypes } from 'react';
import AuthService from '../utils/AuthService';

export default class Home extends Component {
  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }
  render() {
    const {auth} = this.props;
    return (
      <div>
        <button className="btn btn-primary" onClick={auth.login.bind(this)}>Login</button>
      </div>
    );
  }
}