import React from 'react';
import '../App.css';
import {Row,Col,Grid,FormGroup,Form,FormControl,Table} from 'react-bootstrap';
import '../css/paymentPage.css';
import Api from '../Api';
import ProductRowPayment from '../TableComponent/ProductRowPayment';

class ContentPaymentPage extends React.Component {


    constructor(props){
        super(props);
        this.state={
          content:[],
          products:[],
        }
        this.loadCart = this.loadCart.bind(this);
        this.payment = this.payment.bind(this);
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
        } 
        yourCart = JSON.parse(yourCartJsonString);
            
        
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
            _content.push(<ProductRowPayment data={data} key={i}></ProductRowPayment>);
        }
        total = parseFloat(total).toFixed(2);
        sessionStorage.setItem('total',total);
        let _tableCart = [];
        _tableCart.push(<Table key={'table'} >
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th className="text-center">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody id="your-cart">
                        {_content}
                    </tbody>
                    
                    <tfoot>
                        
                        <tr>
                        <td><h4><b className="text-center">Total: {total}</b></h4></td><td></td>
                            <td><a href="#payment" onClick={this.payment} className="btn btn-success btn-block">Buy<i
                                            className="fa fa-angle-right"></i></a></td>
                        </tr>
                    </tfoot>
       </Table>)
        return _tableCart;
    }



    payment(){
        let yourCartJsonString = '';
        let yourCart = [];
        let checkCart = sessionStorage.getItem("cart");
        let tokenCustomer = localStorage.getItem('tokenCustomer');
        if(tokenCustomer == null){
            tokenCustomer = '';
        }
        let dataUser = {
            name: window.jQuery("#f-name").val() + " " + window.jQuery("#l-name").val(),
            address: window.jQuery("#address").val() + window.jQuery("#city").val(),
            phone: window.jQuery("#phone").val(),
            email: window.jQuery("#email").val(),
            country: window.jQuery("#country").val(),
            postCode: window.jQuery("#code").val(),
            cardName: window.jQuery("#card-name").val(),
            cardNumber: window.jQuery("#card-number").val(),
            tokenCustomer: tokenCustomer,
        }

        if (checkCart == null) {
            sessionStorage.setItem("cart", null);
        } else {
            yourCartJsonString = sessionStorage.getItem("cart");
            yourCart = JSON.parse(yourCartJsonString);
            console.log(yourCart);

        }
        //get product info in cart
        let listProducts = [];
        for (let i = 0; i < yourCart.length; i++) {
            let product = {
                id: yourCart[i]['id'],
                quantity: yourCart[i]['quantity'],
                price: yourCart[i]['price'],
            }
            listProducts.push(product);
        }

        let dataProduct = {
            product: listProducts,
            total: sessionStorage.getItem('total'),
        }

        console.log(dataUser);
        console.log(dataProduct);
        let data = {
            dataUser: dataUser,
            dataProduct: dataProduct,
        }
        Api.get("http://127.0.0.1:8000/createBill", data)
        .then((result) => {
            if(result.status){
                alert('You\'ll direct to Home Page. Thanks your purchase');
                sessionStorage.clear();
                window.location.assign("/");
            }
        })
        
    }

    componentDidMount(){
        this.loadCart();
        let checkLogin = localStorage.getItem("tokenCustomer");
        if (checkLogin != null) {
            let data = {
                token: checkLogin,
            }
            Api.get("http://127.0.0.1:8000/getInfoUserPayment", data)
            .then((result) => {
                if(result.status){
                    let name = result['customer']['name'];
                    let address = result['addressDefault']['address'];
                    let city = result['addressDefault']['city'];
                    let phone = result['addressDefault']['phone'];
                    let email = result['customer']['email'];
                    let country = result['addressDefault']['country'];


                    window.jQuery("#f-name").val(name);
                    window.jQuery("#l-name").val();
                    window.jQuery("#address").val(address);
                    window.jQuery("#city").val(city);
                    window.jQuery("#phone").val(phone);
                    window.jQuery("#email").val(email);
                    window.jQuery("#country").val(country);
                }
            })
        }
        
    }
    render() {
        return (
            <div>
                <Grid>
                    <Row className="my-row">
                        <Col lg={3} md={2} sm={1} xs={1}></Col>
                        <Col lg={6} md={8} sm={10} xs={10}>
                            <h1 className="title-page"><b>PAYMENT METHOD</b></h1>
                        </Col>
                        <Col lg={3} md={2} sm={1} xs={1}></Col>
                    </Row>
                    <Row className="my-row is-flex ">
                        <Col lg={8} md={8} sm={8} xs={12} className="payment-content">
                            <Form className="info-user" method="GET">
                                <FormGroup className="form-group name-info-user">
                                    <Row>
                                        <Col lg={6}>
                                            <FormControl type="text" id="f-name" placeholder="Enter frist name" name="f-name"/>
                                        </Col>
                                        <Col lg={6}>
                                            <FormControl type="text" id="l-name" placeholder="Enter last name" name="l-name"/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl type="text" id="address" placeholder="Enter address"name="address"/>
                                </FormGroup>
                                <FormGroup >
                                    <FormControl type="email" id="email" placeholder="Enter email" name="email"/>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl type="number" id="phone" placeholder="Enter phone" name="phone"/>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl type="text" id="city" placeholder="Enter city" name="city"/>
                                </FormGroup>
                                <FormGroup className="name-info-user">
                                    <FormControl type="text" id="country" placeholder="Enter city" name="city"/>
                                </FormGroup>    
                                <FormGroup className="name-info-user">
                                    <FormControl type="text" id="code" placeholder="Enter Postal Code" name="code"/>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl type="text" id="card-name" placeholder="Enter card name" name="card-name"/>
                                </FormGroup>
                                <FormGroup>
                                    <FormControl type="text" id="card-number" placeholder="Enter card number" name="card-number"/>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col lg={4} md={4} sm={4} xs={12} className="payment-content">
                            {this.buildContent()}
                        </Col>
                    </Row>
                </Grid>
            </div>
          );
      }

}

export default ContentPaymentPage;
