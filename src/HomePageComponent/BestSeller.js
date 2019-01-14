import React, { Component } from 'react';
import {Row,Col,Button,Grid } from 'react-bootstrap';
import Product from '../Component/Product';
import Api from '../Api';


class BestSeller extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            productBestSeller: [],
            numberSkip: 4,
        }
        this.getProductByQuantity = this.getProductByQuantity.bind(this);
        this.loadProductBestSeller = this.loadProductBestSeller.bind(this);
        this.loadProductBestSellerMore = this.loadProductBestSellerMore.bind(this);
    }

    loadProductBestSeller() {
        Api.get("http://127.0.0.1:8000/getBestSeller", '')
            .then((result) => {
                if(result.status){
                    this.setState({
                        content: result.product,
                    });
                }
            })
    }

    loadProductBestSellerMore(numberSkip) {
        let data = {
            numberSkip:numberSkip,
            whatPage: 'Home',
        }

        Api.get("http://127.0.0.1:8000/getBestSellerMore", data)
            .then((result) => {
                if(result.status){
                    let data = this.state.content.concat(result.products) ;
                    this.setState({
                        status: true,
                        content:  data,
                        numberSkip: result.numberSkip,
                    });
                }
            })
    }

    getProductByQuantity(){
        this.loadProductBestSellerMore(this.state.numberSkip);
    }

    buildContent() {
        let _content = [];
        let _productContent = [];
        let data = this.state.content;

        for(let i in data) {
            let href = '/product/'+data[i].id;
            _content.push(
                <Col key={'product'+data[i].id} lg={3} md={4} sm={6} xs={12}>
                    <a  href={href}>
                        <Product data={data[i]}></Product>
                    </a>
                </Col>
                
            );
        }
        // _productContent.push(<Image key={'image'+this.state.numberSkip+'4'} className="loading" src="/assets/images/loading.gif"></Image>);
        _productContent.push(<Row key={'new-row'+this.state.numberSkip} className="new adjust">{_content}</Row>);
        return _productContent;
    }

    componentDidMount() {
        this.loadProductBestSeller();
        
        window.jQuery(".btn-more").click(function(){
            setTimeout(function(){
                window.jQuery(".new").hide();
            },50);
            setTimeout(function(){
                window.jQuery(".loading").fadeOut(function(){
                    setTimeout(function(){
                        window.jQuery(".new").fadeIn();
                    },50)
                });
                
            },1000);
            
            if(window.jQuery(".adjust").hasClass("new")){
            window.jQuery("div").removeClass("new");
            }
        })  
    }
    render() {
        return (
            <div className="">
                <Grid>
                    <Row className="my-row">
                        <Col sm={3} lg={3} md={3} xs={3} >
                            <hr className="line-decoration"/>
                        </Col>
                        <Col sm={6} lg={6} md={6} xs={6} >
                            <h1 className="unit"><b>BEST SELLER</b></h1>
                        </Col>
                        <Col sm={3} lg={3} md={3} xs={3} >
                            <hr className="line-decoration"/>
                        </Col>
                    </Row>
                    <br/><br/>
                    <Row className="my-row">
                            {this.buildContent()}
                    </Row>
                    <br/><br/>
                    <Row className="my-row" >
                        <Col sm={5} lg={5} md={5} xs={5} >
                        </Col>
                        <Col sm={2} lg={2} md={2} xs={2} >
                            <Button className="btn-more" onClick={this.getProductByQuantity} >More</Button>
                        </Col>
                        <Col sm={5} lg={5} md={5} xs={5} >
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default BestSeller;

