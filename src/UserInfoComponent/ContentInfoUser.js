import React from 'react';

import '../App.css';
import InfoRight from './InfoRight';
import {Row,Col,Grid} from 'react-bootstrap';
import InfoPersonnal from './InfoPersonal';
import InfoOrder from './InfoOrder';
import AddressBook from './AddressBook';

class ContentInfoUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        content: this.buildContent(),
    }
    this.buildProfileContent = this.buildProfileContent.bind(this);
    this.buildContentUser = this.buildContentUser.bind(this);
    this.buildOrderContent = this.buildOrderContent.bind(this);
    this.buildAddressBookContent = this.buildAddressBookContent.bind(this);
  }

  buildContent(){
    let _content = [];
    _content.push(<InfoRight key={1}></InfoRight>);
    
    return _content;
  }

  buildContentUser(){
    let _content = [];
    _content.push(<InfoRight key={2}></InfoRight>);
    this.setState({
      content: _content
    })
  }

  buildProfileContent(){
    let _content = [];
    _content.push(<InfoPersonnal key={3}></InfoPersonnal>)
    this.setState({
      content: _content
    })
  }

  buildAddressBookContent(){
    let _content = [];
    _content.push(<AddressBook key={4}></AddressBook>)
    this.setState({
      content: _content
    })
  }

  buildOrderContent(){
    let _content = [];
    _content.push(<InfoOrder key={5}></InfoOrder>)
    this.setState({
      content: _content
    })
  }

  componentDidMount(){
    
  }

  render() {
      return (
          <div>
            <Grid>
              <Row>
                  <Col lg={3} md={2} sm={1} xs={1}></Col>
                  <Col lg={6} md={8} sm={10}><h1 className="title-page"><b>MANAGEMENT ACCOUNT</b></h1></Col>
                  <Col lg={3} md={2} sm={1} xs={1}></Col>
              </Row>
              <Row className={'my-row contentPage'}>
                <Col lg={3} md={3} sm={4} >
                  <ul className="account-info-general navi" id="account-direct">
                      <li><strong><a href="#user"  onClick={this.buildContentUser}>My Account</a></strong></li>
                      <li><a href="#profile" onClick={this.buildProfileContent}>My Profile</a></li>
                      <li><a href="#order" onClick={this.buildOrderContent}>My Order</a></li>
                      <li><a href="#addressBook" onClick={this.buildAddressBookContent}>Address Book</a></li>
                  </ul>
                </Col>
                <Col lg={9} md={9} sm={8} xs={10} xsPush={1} smPush={0}>
                  {this.state.content}
                </Col>
              </Row>
            </Grid>
          </div>
      );
  }
}

export default ContentInfoUser;
