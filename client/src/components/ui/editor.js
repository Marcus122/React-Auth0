import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProfileImage from './profile_image';
import Toolbar from './editor_toolbar';

class Editor extends Component {
    constructor(props){
        super(props);
        this.today = new Date();
        this.state={
            placeholderTitle:!props.title,
            placeholderContent:!props.content,
            toolbar:false
        }
        this.onChange=this.onChange.bind(this);
        this.onTitleFocus=this.onTitleFocus.bind(this);
        this.onContentFocus=this.onContentFocus.bind(this);
        this.setToolbar=this.setToolbar.bind(this);
        this.insertTag=this.insertTag.bind(this);
        this.onUploadImage=this.onUploadImage.bind(this);
    }
    titlePlaceholder(){
        if(!this.state.placeholderTitle) return;
        return(
            <div className="title placeholder">
                <span>Title...</span>
            </div>
        );
    }
    contentPlaceholder(){
         if(!this.state.placeholderContent) return;
        return(
            <div className="content placeholder">
                <span>Post content...</span>
            </div>
        );
    }
    onTitleFocus(){
        if(this.state.placeholderTitle){
            this.setState({...this.state, placeholderTitle:false});
        }
    }
    onTitleBlur(){
        this.onChange();
    }
    onContentFocus(){
        var content = document.getElementById("content").innerHTML;
        if(!content){
            var id="id-" + Math.random();
            document.getElementById("content").innerHTML = `<div id="${id}"/>`;
            var p = document.getElementById(id),
                s = window.getSelection(),
                r = document.createRange();
            p.innerHTML = '\u00a0';
            r.selectNode(p);
            s.removeAllRanges();
            s.addRange(r);
            document.execCommand('delete', false, null);
        }
         if(this.state.placeholderContent){
            this.setState({...this.state, placeholderContent:false});
         }
    }
    onChange(){
        var contentText = document.getElementById("content").textContent;
        if(!contentText) document.getElementById("content").innerHTML = "";
        var content = document.getElementById("content").innerHTML;
        var title = document.getElementById("title").innerHTML;
        this.props.onChange({
            title:title,
            content:content
        });
        var showTitle = title ? false: true;
        if(showTitle != this.state.placeholderTitle){
            this.setState({...this.state, placeholderTitle:showTitle});
        }
        var showContent = content ? false: true;
        if(showContent != this.state.placeholderContent){
            this.setState({...this.state, placeholderContent:showContent});
        }
    }
    onContentBlur(){
        this.onChange();
    }
    componentDidMount(){
        var el = document.getElementById("content");
        //el.focus();
        document.addEventListener("mouseup",this.setToolbar);
    }
    insertTag({tag,off}){
        var selection = window.getSelection();
        var parent = selection.focusNode.parentElement;
        if(!selection.toString() || !parent){
            return;
        }
        var id;
        if(off){
            id=parent.parentElement.id;
            parent.parentElement.innerHTML = parent.innerHTML;
        }else{
            id="id-" + Math.random();
            parent.innerHTML = `<${tag} id=${id}>${parent.innerHTML}</${tag}>`;
        }
        setTimeout( ()=>{
            var range = document.createRange();
            range.selectNode(document.getElementById(id));
            selection.removeAllRanges();
            selection.addRange(range);
            this.setState({...this.state,toolbar:true});
        });
    }
    setToolbar(){
        setTimeout( ()=>{
            var selection = window.getSelection();
            if(!selection.toString()){
                if(this.state.toolbar){
                    this.setState({...this.state,toolbar:false});
                }
                return;
            }
            return this.setState({...this.state,toolbar:true});
        },0);
    }
    getSelectedTag(){
        var selection = window.getSelection();
        var parent = selection.anchorNode.parentElement;
        return parent ? parent.tagName.toLowerCase() : "";
    }
    onUploadImage(ev){
        if(!ev.target.files[0]) return;
        var formData = new FormData();
        formData.append("image",ev.target.files[0]);
        this.props.uploadImage(formData);
    }
    render(){
        return(
            <div className="post-editor">
                {this.props.image ? <img src={this.props.image}/> : ''}
                <input type="file" name="avatar" onChange={this.onUploadImage}/>
                {this.titlePlaceholder()}
                <div contentEditable="true" id="title" className="title" onFocus={this.onTitleFocus} onBlur={this.onChange}>
                    {this.props.title}
                </div>
                <div className="user">
                    <ProfileImage image={this.props.profileImage}/>
                    <span>{this.props.name}</span>
                    <span>{this.props.date || this.today.toDateString()}</span>
                </div>
                {this.contentPlaceholder()}
                <div contentEditable="true" id="content" onFocus={this.onContentFocus} onBlur={this.onChange}>
                    {this.props.content}
                </div>
                {this.state.toolbar ? <Toolbar selected={this.getSelectedTag()} onClick={this.insertTag}/> : ''}
            </div>
        )
    }
}
Editor.defaultProps = { onChange: function(){}, uploadImage: function(){}};

export default Editor;