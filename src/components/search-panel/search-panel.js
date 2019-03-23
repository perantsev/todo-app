import React, { Component } from 'react'

import './search-panel.css';

export default class SearchPanel extends Component  {
    
    state = {
        text: ''
    };

    onLabelChange = (e) => {
        const text = e.target.value;
        this.setState({ 
        text: text
        });
        this.props.onSearch(text);
    }
    render() { 
    return         <input className="search-input" placeholder="search"
        value={this.state.text}
        onChange={this.onLabelChange}/>;
        
    }
}