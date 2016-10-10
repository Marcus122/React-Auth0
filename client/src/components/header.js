import React,{Component} from 'react';
import NavLink from './ui/nav_link';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Header extends Component{
    renderLinks(){
        return (
            <ul className="nav nav-tabs">
                <NavLink to="/" text="Home"/>
                <NavLink to="/profile" text="Profile"/>
                <NavLink to="/messages" text="Messages"/>
                <NavLink to="/create" text="Create Post"/>
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
                <div className="header-bar">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h1 className="display-3">Title</h1>
                            <p className="lead">Subtext.</p>
                        </div>
                    </div>
                </div>
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