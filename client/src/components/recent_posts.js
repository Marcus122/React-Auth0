import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class RecentPosts extends Component{
    componentWillMount(){
        this.props.fetchPosts();
    }
    printPosts(){
        if(!this.props.posts) return;
        return this.props.posts.map(post => {
            return (
                <li>{post.title}</li>
            );
        });
    }
    render(){
        return(
            <div>
                <h3>Recent Posts</h3>
                <ul>
                {this.printPosts()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {posts:state.posts};
}

export default connect(mapStateToProps,actions)(RecentPosts);