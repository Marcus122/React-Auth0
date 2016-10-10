import React, { Component } from 'react';
import ProfileImage from './profile_image';

export default class Post extends Component {
    constructor(props){
        super(props);
        this.today = new Date();
    }
    calcDays(){
        const days = Math.round((this.today-this.props.date)/(1000*60*60*24));
        if(!days) return "Today";
        return days === 1 ? "1 day ago" : `${days} days ago`;
    }
    render(){
        return(
            <div className="card text-xs-center">
                <div className="card-header">
                    <ProfileImage image={this.props.image}/>
                    <h3>{this.props.user}</h3>
                </div>
                <div className="card-block">
                    <h4 className="card-title">{this.props.title}</h4>
                    <p className="card-text">{this.props.text}</p>
                    <a href="#" className="btn btn-primary">View</a>
                </div>
                <div className="card-footer text-muted">
                    {this.calcDays()}
                </div>
            </div>
        )
    }
}