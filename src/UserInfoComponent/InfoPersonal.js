import React, { Component } from 'react';
import {Row,Col,Form,FormControl,FormGroup,Button} from 'react-bootstrap';
import Api from '../Api';
import '../css/contactPage.css';

class InfoRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
        }
        this.loadInfoUser = this.loadInfoUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    updateUser(){
        let data = {
            name: window.jQuery("#name").val(),
            address: window.jQuery("#address").val(),
            phone: window.jQuery("#phone").val(),
            email: window.jQuery("#email").val(),
            country: window.jQuery("#country").val(),
            city: window.jQuery("#city").val(),
        }
        console.log(data);
        Api.get("http://127.0.0.1:8000/updateCustomer", data)
        .then((result) => {
            console.log('Request send');
            console.log('Message: ' + result['message']);
            if(result['status']){
                // window.location.assign('/ajustAccount');
                window.jQuery('.message-error').show('slow');
                window.jQuery('.message-error').html("Update Success");
                window.jQuery('.message-error').css('color','black');
            }
        });
    }

    loadInfoUser(){
        let checkLogin = localStorage.getItem("tokenCustomer");
       
        if(checkLogin!= null){
          let data = {
            token: checkLogin
          }
            Api.get("http://127.0.0.1:8000/checkLogin", data)
            .then((result) => {
                console.log(result)
                if(result.status){
                    let name = result['customer']['name'];
                    let address = result['customer']['address'];
                    let city = result['customer']['city'];
                    let phone = result['customer']['phone'];
                    let email = result['customer']['email'];
                    let country = result['customer']['country'];
                    let check = false;
    
                    if (name == null) {
                        name = '';
                        check = true;
                    }
                    if (city == null) {
                        city = '';
                        check = true;
                    }
                    if (address == null) {
                        address = '';
                        check = true;
                    }
                    if (phone == null) {
                        phone = '';
                        check = true;
                    }
                    if (country == null) {
                        country = '';
                        check = true;
                    }
                    window.jQuery('#name').val(name);
                    window.jQuery('#address').val(address);
                    window.jQuery('#email').val(email);
                    window.jQuery('#phone').val(phone);
                    window.jQuery('#city').val(city + country);
                }
            })
        }else{
            window.location.assign("/");
        }
    }
     
    componentDidMount(){
        this.loadInfoUser();
    }


    render() {
        return (
            <div>
                <Row className="row is-flex account-info-general">
                    <Col lg={12}>
                        <h1 className="title-info" >Personal Profile Ajust</h1><br/>
                        <Form className="info-user" method="GET">
                            <FormGroup className=" name-info-user">
                                <FormControl type="text" id="name"  placeholder="Enter name"
                                       name="name"/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="text" id="address" placeholder="Enter address"
                                       name="address"/>
                            </FormGroup>
                            <FormGroup >
                                <FormControl type="email" id="email" readOnly placeholder="Enter email"
                                       name="email"/>
                            </FormGroup>
                            <FormGroup >
                                <FormControl type="number" id="phone" placeholder="Enter phone"
                                       name="phone"/>
                            </FormGroup>
                            <FormGroup >
                                <FormControl type="text" id="city" placeholder="Enter city" name="city"/>
                            </FormGroup>
                            <FormGroup className="form-group name-info-user">
                                <Row >
                                    <Col lg={6}>
                                        <select className="form-control" id="country">
                                            <option value="0">Your Country</option>
                                            <option value="VN">VN</option>
                                            <option value="Phap">Phap</option>
                                            <option value="Japaneses">Japaneses</option>
                                            <option value="Korea">Korea</option>
                                        </select>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Button type="button" onClick={this.updateUser} className="btn btn-success btn-update-info ">Update
                                    Information
                                </Button>
                            </FormGroup>
                        </Form>
                        <div className="alert alert-warning message-error">
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InfoRight;

