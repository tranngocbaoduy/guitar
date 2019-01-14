import React, { Component } from 'react';
import Page from '../Page';
import ContentProductDetailPage from '../ProductDetailComponent/ContentProductDetailPage';

import '../css/productDetailPage.css';

class ProductDetailPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
          productId:this.props.match.params.productId,
        }
    }

    buildContent(){
        let _content = [];
        _content.push(<ContentProductDetailPage  key={2} productId={this.state.productId} ></ContentProductDetailPage>);
        
        return _content;
    }

    componentDidMount(){
        this.setState({
            content: this.buildContent(),
            productId:this.props.match.params.productId,
        });
    }

    render() {
        return (
            
            <div>
             <Page content={this.state.content}></Page>
            </div>
        );
    }
}

export default ProductDetailPage;
