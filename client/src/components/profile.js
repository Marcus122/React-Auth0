import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ProfileImage from './ui/profile_image';
import Post from './ui/post';

class Profile extends Component{
    constructor(props){
        super(props);
        this.saveProfile=this.saveProfile.bind(this);
        this.createPost=this.createPost.bind(this);
    }
    componentWillMount(){
        this.props.fetchUserPosts();
        if(!this.props.profile){
            this.props.getProfile();
        }
    }
    printPosts(){
        if(!this.props.posts) return;
        const image = this.props.profile ? this.props.profile.picture : "";
        return this.props.posts.map(post => {
            return (
                <Post key={post._id} title={post.title} text={post.content} date={new Date(post.date)}  image={image}/>
            );
        });
    }
    saveProfile(){
        this.props.updateProfile(this.props.profile.user_id,{test:"test"});
    }
    createPost(){
        this.props.createPost();
    }
    render(){
        return(
            <div>
                <h2>Profile page</h2>
                <div className="post-list">
                {this.printPosts()}
                </div>
                <ProfileImage image={this.props.profile ? this.props.profile.picture : ""}/>
                <span>{this.props.profile ? this.props.profile.name : ""}</span>
                <button className="btn btn-primary" onClick={this.saveProfile}>Save</button>
                <button className="btn btn-primary" onClick={this.createPost}>Create Post</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts:state.auth.posts,profile:state.auth.profile};
}

export default connect(mapStateToProps,actions)(Profile);