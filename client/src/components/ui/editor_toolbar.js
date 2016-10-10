import React, { Component } from 'react';

export default class Editor extends Component {
    constructor(props){
        super(props);
        this.buttonPress = this.buttonPress.bind(this);
    }
    buttonPress(ev){
        var type = ev.currentTarget.dataset["type"];
        if(!type) return;
        this.props.onClick({
            tag: type,
            off: type === this.props.selected ? true : false
        });
    }
    getClassName(tag){
        return tag === this.props.selected ? "btn btn-primary" : "btn btn-secondary";
    }
    render(){
        return(
            <div className="btn-group editor-toolbar" role="group" aria-label="Basic example">
                <button onClick={this.buttonPress} data-type="strong" type="button" className={this.getClassName("strong")}><strong>B</strong></button>
                <button onClick={this.buttonPress} data-type="h3" type="button" className={this.getClassName("h3")}><span>T</span></button>
                <button onClick={this.buttonPress} data-type="i" type="button" className={this.getClassName("i")}><i>i</i></button>
            </div>
        )
    }
}