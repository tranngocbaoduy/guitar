import React, { Component } from 'react';
import './App.css';
import Api from './Api';
import {Row,Col,Grid} from 'react-bootstrap';

class MyData extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        content:[],
        cateList: [],
        k:0,
    }
    this.loadCategoryList = this.loadCategoryList.bind(this);
  }
  loadCategoryList() {
    Api.get("http://127.0.0.1:8000/getProductByIdAjax", {id: 2, start: 0})
        .then((rs) => {
          this.setState({
            cateList: rs.product,
          });
        })
        /*.then((rs)=>{
          this.setState({
            content: this.buildContent(),
            k: 2,
          });
        });*/
  }

  buildContent(){
    let _content = [];
    console.log(this.state.cateList);
    for(let i in this.state.cateList){
      _content.push(<Grid key={i}><Row ><Col>{this.state.cateList[i].name}</Col></Row></Grid>)
    }
    console.log(_content);
    return _content;
  }
 
  componentDidMount(){
    this.loadCategoryList();
  }

  
  render() { 
    console.log(this.state.cateList);
    return (
      <div>
        {this.buildContent()}
      </div>
    );
  }
}


export default MyData;