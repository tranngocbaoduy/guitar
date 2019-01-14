import React, { Component } from 'react';
import './App.css';
import { Row,Col } from 'react-bootstrap';
import './css/footer.css';
import './css/common.css';
import Data from './Data';

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
        content: []
    }
  }
  buildContent() {
    let _content = [];
    let cate = Data.cate;
    for(var i in cate) { 
      let href = '/productCateId/' +cate[i].id;
      _content.push(
           <li key={'3.'+i}><a href={href}>{cate[i].name}</a><br/></li>
      );
    }
    let _cateContent = [];
    _cateContent.push( <ul className="footer-navigation" key={4}><li><b  >Products</b></li><br/><br/>{_content}</ul>);
    return _cateContent;
  }

  componentDidMount() {
    this.setState({
        content: this.buildContent()
    });
  } 

  render() {
    return (
      <div className="footer">
        
        <Row>
          <Col lg={4} md={5} sm={12} xs={12}>
            
              Contact us via any of the following methods during our business hours<br/>
              Monday - Fridat 8:30 AM - 5:30 PM 	Pacific Time <br/>
              Services@gamingzone.com<br/>
              Phone:1-(626)-854-9338 op. 4
         
          </Col>
          <Col lg={8} md={7} sm={12} xs={12}>
            <Row>
              <Col lg={3} md={3} sm={3} xs={6}>
                {this.state.content}
              </Col>
              <Col lg={3} md={3} sm={3} xs={6}>
                <ul className="footer-navigation">
                  <li><b>Brands</b></li><br/><br/>
                  <li><a href="/#">Charvel</a></li><br/>
                  <li><a href="/#">Cordoba</a></li><br/>
                  <li><a href="/#">EVH</a></li><br/>
                  <li><a href="/#">Fender</a></li><br/>
                  <li><a href="/#">Gretsch</a></li><br/>
               </ul>
              </Col>
              <Col lg={3} md={3} sm={3} xs={6}>
                <ul className="footer-navigation">
                  <li><b>Contact </b></li><br/><br/>
                  <li><a href="/#">Fanpage</a></li><br/>
                  <li><a href="/#">Twitter</a></li><br/>
                  <li><a href="/#">Follow us</a></li><br/>
                  <li><a href="/#">Comunity</a></li><br/>
                </ul>
              </Col>
              <Col lg={3} md={3} sm={3} xs={6}>
                <ul className="footer-navigation">
                  <li><b>Videos</b></li><br/><br/>
                  <li><a href="/#">Live Stream</a></li><br/>
                  <li><a href="/#">Video Tutorial</a></li><br/>
                  <li><a href="/#">All Video</a></li><br/>
                  <li><a href="/#">Gallery</a></li><br/>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        
      </div>
    );
  }
}

export default Footer;
