import React, { Component } from 'react';
import {Row,Col,Button } from 'react-bootstrap';
import Product from '../Component/Product';
import Api from '../Api';

class InfoRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            cateId: this.props.getInfo[0],
            brandId: this.props.getInfo[1],
            category : {},
            brand: {},
            numberSkip:0,
            choose: -1,
        }
        this.loadProduct = this.loadProduct.bind(this);
        this.loadProductMore = this.loadProductMore.bind(this);
        this.getProductByQuantity = this.getProductByQuantity.bind(this);
    }


    loadProduct() {
        let data = {
            id :'',
            url: '',
        }
        if(isNaN(this.props.getInfo[0])){
            data.id = parseInt(this.props.getInfo[1]);
            data.url = "http://127.0.0.1:8000/getProductByBrand";
        }else{
            data.id = parseInt(this.props.getInfo[0]);
            data.url = "http://127.0.0.1:8000/getProductByCategory";
        }

        Api.get(data.url, data)
            .then((result) => {
                if(result.status){
                    if(result.choose === 1){
                        this.setState({
                            content: result.products,
                            brand: result.brand[0],
                            choose: 1,
                        });
                    }else{
                        this.setState({
                            content: result.products,
                            category : result.cate[0],
                            choose: 0,
                        });
                    }
                   
                }
            })
    }

    loadProductMore(numberSkip) {
        let data = {
            id: '',
            numberSkip:numberSkip,
            whatPage: 'Product',
        }
        if(isNaN(this.props.getInfo[0])){
            data.id = parseInt(this.props.getInfo[1]);
        }else{
            data.id = parseInt(this.props.getInfo[0]);
        }

        Api.get("http://127.0.0.1:8000/getProductByCategoryMore", data)
            .then((result) => {
                if(result.status){
                    let data = this.state.content.concat(result.products) ;
                    this.setState({
                        content:  data,
                        numberSkip: result.numberSkip,
                    });
                }
            })
    }

    getProductByQuantity(){
        this.loadProductMore(this.state.numberSkip);
    }

    buildContent() {
        let _content = [];
        let data = this.state.content;
        console.log(this.state.content);
        let _productContent = [];
        if(data.length>0){
            for(var i in data) {
                let href = '/product/'+data[i].id;
                _content.push(
                    <Col key={i} lg={4} md={4} sm={6} xs={12}>
                        <a  href={href}>
                        <Product data={data[i]}></Product>
                        </a>
                    </Col>
                );
            }
            _productContent.push(<Row key={i}>{_content}</Row>);
        }
    
        return _productContent;
    }
    
    componentDidMount() {
       this.loadProduct();
    }


  render() {
    let temp ;
    if(this.state.choose === 1){
        temp = this.state.brand.name;
    }else{
        temp = this.state.category.name;
    }
    return (
        <div className="">
            <Row className="my-row">
                <Col sm={3} lg={3} md={2} xs={1} >
                    <hr className="line-decoration"/>
                </Col>
                <Col sm={6} lg={6} md={8} xs={10} >
                    <h1 className="unit"><b>{temp}</b></h1>
                </Col>
                <Col sm={3} lg={3} md={2} xs={1} >
                    <hr className="line-decoration"/>
                </Col>
            </Row>
            <br/><br/>
           
            {this.buildContent()}
            <Row className="my-row" >
                <Col sm={5} lg={5} md={5} xs={5} >
            
                </Col>
                <Col sm={2} lg={2} md={2} xs={2} >
                    <Button className="btn-more" onClick={this.getProductByQuantity}>More</Button>
                </Col>
                <Col sm={5} lg={5} md={5} xs={5} >
                </Col>
            </Row>
        </div>
    );
  }
}

export default InfoRight;

