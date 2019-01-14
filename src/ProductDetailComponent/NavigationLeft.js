import React, { Component } from 'react';
import '../css/navigationPathCategory.css';
import Api from '../Api';


class NavigationLeft extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentCategory: [],
            contentBrand: [],
        }
        this.buildContentBrand = this.buildContentBrand.bind(this);
        this.buildContentCategory = this.buildContentCategory.bind(this);
    }

    buildContentCategory() {
        let _content = [];
        let cate = this.state.contentCategory;
        for(var i in cate) { 
          let href = '/productCateId/' +cate[i].id;
          _content.push(
               
               <li key={'3.'+ i}><a href={href}>{cate[i].name}</a></li>
          );
        }
        let _cateContent = [];
        _cateContent.push(<ul className="list-category" key={3}>{_content}</ul>);
        return _cateContent;
      }

    loadBrand() {
        Api.get("http://127.0.0.1:8000/getAllBrand", '')
            .then((result) => {
                if(result.status){
                    this.setState({
                        contentBrand:  result.brands,
                    });
                }
            })
    }

    loadCategory() {
        Api.get("http://127.0.0.1:8000/getAllCategory", '')
            .then((result) => {
                if(result.status){
                    this.setState({
                        contentCategory:  result.categories,
                    });
                }
            })
    }

    buildContentBrand() {
        let _content = [];
        let brand = this.state.contentBrand;
        for(var i in brand) { 
            let href = '/productBrandId/' +brand[i].id;
            _content.push(
                
                <li key={'4.'+ i}><a href={href}>{brand[i].name}</a></li>
            );
        }
        let _brandContent = [];
        _brandContent.push(<ul className="list-category" key={4}>{_content}</ul>);
        return _brandContent;
    }
    
    componentDidMount() {
        this.loadBrand();
        this.loadCategory();
    } 


  render() {
    return (
        <div className="navigation-product">
            <div className=" category">
                <h1><b>Product</b></h1>
               {this.buildContentCategory()}
            </div>
            <div className=" category">
                <h1><b>Brands</b></h1>
                {this.buildContentBrand()}
            </div>
            <div className=" category">
                <h1 ><b>Level</b></h1>
                <ul>
                    <li>Entry level</li>
                    <li>Semi pro</li>
                    <li>Pro level</li>
                </ul>
            </div>
        </div>
    );
  }
}

export default NavigationLeft;

