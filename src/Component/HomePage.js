import React, { Component } from 'react';
import {Col} from 'react-bootstrap';
import Page from '../Page';
import Data from '../Data';
import Product from '../Component/Product';
import NewProduct from '../HomePageComponent/NewProduct';
import MyCarousel from '../HomePageComponent/Carousel';
import BestSeller from '../HomePageComponent/BestSeller';
import Guitarist from '../HomePageComponent/Guitarist';
class HomePage extends Component {


  constructor(props) {
    super(props);
    this.state = {
        content: this.buildContent()
    }
  }
  buildContent() {
    let _content = [];

    let data = Data.data;
    for(var i in data) {
        _content.push(
            <Col key={i} xs={6} md={4}>
                <Product data={data[i]}></Product>
            </Col>
        );
    }

    let _productContent = [];

    _productContent.push(<MyCarousel key="myCarousel"></MyCarousel>)
    _productContent.push(<NewProduct key="newProduct"></NewProduct>)
    _productContent.push(<BestSeller key="bestSeller"></BestSeller>)
    _productContent.push(<Guitarist  key="guitarist"></Guitarist>)
    return _productContent;
  }

  
  
  render() {
      return (
        <div>
          <Page content={this.state.content}></Page>
        </div>
      );
    }
  }

export default HomePage;
