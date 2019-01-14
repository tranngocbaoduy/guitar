import React, { Component } from 'react';
import Page from '../Page';
import MyCarousel from '../HomePageComponent/Carousel';
import ContentProductPage from '../ProductPageComponent/ContentProductPage';

class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
          cateId:this.props.match.params.cateId,
          brandId:this.props.match.params.brandId,
        }
    }

    buildContent(){
        let getInfo = [];
        getInfo.push(this.state.cateId);
        getInfo.push(this.state.brandId);


        let _content = [];
        _content.push(<MyCarousel key={1}></MyCarousel>);
        _content.push(<ContentProductPage key={2} getInfo={getInfo}></ContentProductPage>);
        
        return _content;
    }

    componentDidMount(){
        this.setState({
            content: this.buildContent(),
            cateId:this.props.match.params.cateId,
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

export default ProductPage;
