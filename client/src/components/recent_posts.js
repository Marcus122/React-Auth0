import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Post from './ui/post';

class RecentPosts extends Component{
    componentWillMount(){
        this.props.fetchPosts();
    }
    printPosts(){
        if(!this.props.posts) return;
        return this.props.posts.map(post => {
            return (
                <Post key={post._id} title={post.title} text={post.content} date={new Date(post.date)} image={post.image}/>
            );
        });
    }
    render(){
        return(
            <div>
                <h3>Recent Posts</h3>
                <div className="post-list">
                {this.printPosts()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts:state.posts};
}

export default connect(mapStateToProps,actions)(RecentPosts);