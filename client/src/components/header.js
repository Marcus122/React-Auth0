import React,{Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Header extends Component{
    renderLinks(){
        return (
            <ul className="nav nav-tabs">
                <li role="presentation"><Link to="/">Home</Link></li>
                <li role="presentation"><Link to="/profile">Profile</Link></li>
                <li role="presentation"><Link to="#">Messages</Link></li>
                <li role="presentation"><Link to="/create">Create Post</Link></li>
            </ul>
        );
    }
    renderLogin(){
        if(!this.props.authenticated){
            return <button className="btn btn-primary" onClick={this.props.signinUser}>Sign In</button>;
        }else{
            return <button className="btn btn-danger" onClick={this.props.signoutUser}>Sign Out</button>;
        }
    }
    render(){
        return(
            <header>
                <nav className="navbar navbar-light">
                    {this.renderLinks()}
                    {this.renderLogin()}
                </nav>
            </header>
        )
    };
}

function mapStateToProps(state){
    return {
        authenticated:state.auth.authenticated
    }
}

export default connect(mapStateToProps,actions)(Header);