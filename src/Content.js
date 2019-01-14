import React, { Component } from 'react';
import './App.css';

class Content extends Component {
  render() {
    return (
      <div>
          {this.props.content}
      </div>
    );
  }
}

export default Content;
