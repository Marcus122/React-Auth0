import React, { Component } from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';

import Header from './header';
import Footer from './footer';

class App extends Component {
  constructor(props){
      super(props);
      props.authInit();
  }
  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

export default connect(null,actions)(App);
