import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createPost,getProfile,uploadImage} from '../actions/index';
import { Link } from 'react-router';
import Editor from './ui/editor';

class PostsNew extends Component{
    constructor(props){
        super(props);
        this.state = {
            image:"",
            content:"",
            title:""
        }
        this.onChange=this.onChange.bind(this);
        this.imageUpload=this.imageUpload.bind(this);
    }
    static contextTypes = {
        router:PropTypes.object
    };
    componentWillMount(){
        if(!this.props.profile){
            this.props.getProfile();
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.image){
            this.setState({...this.state, image:nextProps.image });
        }
    }
    imageUpload(formData){
        this.props.uploadImage(formData);
    }
    onSubmit(ev){
        ev.preventDefault();
        this.props.createPost(this.state.post)
            .then(()=>{
                this.context.router.push('/profile');
            });
    }
    onChange(post){
        this.setState({...this.state,...post});
    }
    render(){
        const { fields: { title,content },handleSubmit} = this.props;
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <h3>Create A New Post</h3>
                <Editor uploadImage={this.imageUpload} image={this.state.image ? this.state.image.url : null} profileImage={this.props.profile ? this.props.profile.picture : ""} name={this.props.profile ? this.props.profile.name : ""} onChange={this.onChange}/>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/profile" className="btn btn-danger">Cancel</Link>
            </form>
        );
        return(
            <div>
                <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
                    <label>Title</label>
                    <input type="text" className="form-control" {...title}/>
                    <div className="text-help">
                        {title.touched ? title.error : ''}
                    </div>
                </div>
                <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
                    <label>Content</label>
                    <textarea className="form-control" {...content}/>
                    <div className="text-help">
                        {content.touched ? content.error : ''}
                    </div>
                </div>
            </div>
        );
    };
}

function validate(values){
    const errors={};

    if(!values.title){
        errors.title = 'Enter a username';
    }
    if(!values.content){
        errors.content = 'Enter some content';
    }

    return errors;
}
function mapStateToProps(state){
    return {profile:state.auth.profile,image:state.auth.image};
}
export default reduxForm({
    form:'PostsNewForm',
    fields:['title','content'],
    validate
},mapStateToProps,{createPost,getProfile,uploadImage})(PostsNew);