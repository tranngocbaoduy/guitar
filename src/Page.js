import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import './App.css';

class Page extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Content content={this.props.content}></Content>
        <Footer></Footer>
      </div>
    );
  }
}

export default Page;
