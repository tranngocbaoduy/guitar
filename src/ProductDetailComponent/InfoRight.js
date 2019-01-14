import React, { Component } from 'react';
import {Row,Col,Button } from 'react-bootstrap';
import Api from '../Api';


class InfoRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            productId: this.props.productId,
            product: {},
            brand: {},
            category: {},
        }
        this.addCart = this.addCart.bind(this);
      }

     
    addCart(e) {
        e.preventDefault();
        let product = this.state.product;
        let yourCartJsonString = '';
        let exist = false;
        let yourCart = [];
        let check = sessionStorage.getItem("cart");
        if (check == null) {
            sessionStorage.setItem("cart", []);
        } else {
            yourCartJsonString = sessionStorage.getItem("cart");
            if (yourCartJsonString !== '') {
                yourCart = JSON.parse(yourCartJsonString);
            }
            for (let i = 0; i < yourCart.length; i++) {
                if (product.id === yourCart[i]['id']) {
                    yourCart[i]['quantity'] = parseInt(yourCart[i]['quantity']) + parseInt(1);
                    exist = true;
                    break;
                }
            }
        }
        
       
        if (!exist) {
            let data = {
                id: product.id,
                quantity: 1,
                price: product.price,
            }
            yourCart.push(data);
        }

        yourCartJsonString = JSON.stringify(yourCart);
        sessionStorage.setItem("cart", yourCartJsonString);

        window.location.assign("/cart");
    }

    loadProductById(){
        let data={
            id: this.state.productId,
        }
        Api.get("http://127.0.0.1:8000/getProductByIdAjax", data)
            .then((result) => {
                if(result.status){
                    this.setState({
                        product:  result.product,
                        brand: result.brand,
                        category: result.category,
                    });
                }
            })
    }

    buildContent() {
        let _content = [];
        let product = this.state.product;
        let brand = this.state.brand;

        let _productContent = [];
        
        let image = '/assets/images/product/' + product.image;
        _content.push(
            <Col key={'image'} sm={5} lg={5} md={5} xs={12}>
              <img src={image} alt="" className="product"/>
            </Col>

        );

      
       
        _content.push(
            <Col key={'info'} sm={7} lg={7} md={7} xs={12}>
              <ul className="detail">
                  <li><h3><b>Name:</b> {product.name}</h3></li>
                  <li><b>Price:</b> {product.price}</li>
                  <li><b>Brand:</b> {brand.name}</li>

              </ul>
              <Button onClick={this.addCart}>AddCart</Button>
            </Col>
            
        );
        _productContent.push(<Row className={'contentDetailProduct'} key={'detail'}>{_content}</Row>);
        
      
        return _productContent;
      }
    
    componentDidMount() {
       this.loadProductById();
    }


  render() {
    return (
        <div className="">
            <Row >
                <Col sm={3} lg={3} md={3} xs={3} >
                    <hr className="line-decoration"/>
                </Col>
                <Col sm={6} lg={6} md={6} xs={6} >
                    <h1 className="unit"><b>{this.state.category.name}</b></h1>
                </Col>
                <Col sm={3} lg={3} md={3} xs={3} >
                    <hr className="line-decoration"/>
                </Col>
            </Row>
            <br/><br/>
           
            {this.buildContent()}

            <Row className="row fd-product-tabs information-product-content">
                    <ul className="nav nav-tabs ">
                        <li className="active"><a data-toggle="tab" href="#ptap-detail">Product Detail</a></li>
                        <li><a data-toggle="tab" href="#ptap-feedback">Feedback(0)</a></li>
                        <li><a data-toggle="tab" href="#ptap-video">Video</a></li>
                    </ul>
                    <div className="tab-content" id="detail-product">
                        <div id="ptap-detail" className="tab-pane fade in active">
                            <li>Brand Name: <b>Cordoba</b></li>
                            <li>Type: <b>Acoustic Guitar</b></li>
                            <li>Suitable For: <b>Beginner, Unisex, Professional Performance, Home-schooling</b></li>
                            <li>Model Number: <b>AGT16</b></li>
                            <li>Pickup: none</li>
                            <li>Tone Position: <b>18</b></li>
                        </div>
                        <div id="ptap-feedback" className="tab-pane fade">
                            <p>Feeldback here</p>
                        </div>
                        <div id="ptap-video" className="tab-pane fade">
                            <p>Video here</p>
                        </div>
                    </div>
                </Row>
            <Row className="my-row" >
                <Col sm={5} lg={5} md={5} xs={5} lgPush={2} mdPush={2} smPush={2} xsPush={2}>
            
                </Col>
                <Col sm={2} lg={2} md={2} xs={2} >
                    <Button className="btn-more">More</Button>
                </Col>
                <Col sm={5} lg={5} md={5} xs={5} lgPull={2} mdPull={2} smPull={2} xsPull={2}>
                </Col>
            </Row>
        </div>
    );
  }
}

export default InfoRight;

