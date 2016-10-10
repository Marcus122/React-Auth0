import React,{Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class NavLink extends Component{
    render(){
        let isActive = this.context.router.isActive(this.props.to, true),
            className = isActive ? "active" : "";
        return(
            <li role="presentation" className={className}><Link to={this.props.to} activeClassName="active">{this.props.text}</Link></li>
        )
    };
}

NavLink.contextTypes = {
    router:PropTypes.object
};