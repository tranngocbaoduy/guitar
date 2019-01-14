import React from 'react';
import '../App.css';
import Api from '../Api';
import {Row,Col,Table,Grid} from 'react-bootstrap';
import '../css/yourCartPage.css';
import ProductRowCart from '../TableComponent/ProductRowCart';

class ContentCartPage extends React.Component {

    constructor(props){
        super(props);
        this.state={
          content:[],
          products: [],
        }
        this.loadCart = this.loadCart.bind(this);
    }

    loadCart(){
        let groupProductId = [];
        let yourCart = [];
        let yourCartJsonString = sessionStorage.getItem("cart");
        if (yourCartJsonString == null) {
            sessionStorage.setItem("cart", []);
            
        } else {
            if (yourCartJsonString !== '') {
                yourCart = JSON.parse(yourCartJsonString);
            }
            for (let i = 0; i < yourCart.length; i++) {
                groupProductId.push(yourCart[i].id);
            }
        }
        let data={
            groupProductId: groupProductId,
        }
        Api.get("http://127.0.0.1:8000/getProductByGroupIdAjax", data)
            .then((result) => {
                if(result.status){
                    this.setState({
                        products:  result.productGroup,
                    });
                }
            })
    }

    buildContent(){
        let _content = [];
        let cart = this.state.products; 
        let total = 0;
        let yourCart = [];
        let yourCartJsonString = sessionStorage.getItem("cart");
        
        if (yourCartJsonString == null) {
            sessionStorage.setItem("cart", []);
        } else{
            if (yourCartJsonString !== '') {
                yourCart = JSON.parse(yourCartJsonString);
            }
        }
            
        
        for (let i = 0; i < cart.length; i++) {
            
            let data = {
                'num': i,
                'name': cart[i].name,
                'image': cart[i].image,
                'price' : cart[i].price,
                'quantity' : yourCart[i].quantity,
                'subtotal' : (cart[i].price*yourCart[i].quantity).toFixed(2),
            }
            total += cart[i].price*yourCart[i].quantity;
            _content.push(<ProductRowCart data={data} key={i}></ProductRowCart>);
        }
        total = parseFloat(total).toFixed(2);
        

        let _tableCart = [];
        _tableCart.push(<Table  id="cart"  key={'table'} className="table table-hover ">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th className="text-center">Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="your-cart">
                        {_content}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><a href="/" className="btn btn-warning"><i className="fa fa-angle-left"></i>
                                    Continue Shopping</a></td>
                            <td colSpan="3" className="hidden-xs"></td>
                            <td className="hidden-xs text-center">Total: $ {total}<strong  id="total"></strong></td>
                            <td><a href="/payment" className="btn btn-success btn-block">Go to Payment<i
                                            className="fa fa-angle-right"></i></a></td>
                        </tr>
                    </tfoot>
       </Table>)
        if(cart.length>0){
            window.jQuery('.btn-block').show();
        }else{
            window.jQuery('.btn-block').hide();
            _tableCart.push(<Row className="check-cart"><h3>Your Cart Is Empty. Please Add Cart What Ever You Want =)))</h3></Row>)
        }
        return _tableCart;
    }

    componentDidMount(){
        this.loadCart();
    }

    render() {
        console.log(this.state.content);
      return (
        <div>
          
               <Row className="contentPage my-row is-flex">
                    <Col lg={3} md={2} sm={1} xs={1}></Col>
                    <Col lg={6} md={8} sm={10} xs={12}>
                        <h1 className="title-page"><b>YOUR CART</b></h1>
                    </Col>
                    <Col lg={3} md={2} sm={1} xs={1}></Col>
                </Row>
            <Grid>
                <Row className="contentPage my-row is-flex">
                    
                    {this.buildContent()}
                    
                   
                </Row>
            </Grid>
        </div>
      );
    }
}

export default ContentCartPage;
