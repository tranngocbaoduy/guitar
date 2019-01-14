import React, { Component } from 'react';
import {Row,Col,Table,Form,FormControl,FormGroup} from 'react-bootstrap';
import Api from '../Api';

class AddressBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: this.buildContent(),
        }
        this.loadInfoUser = this.loadInfoUser.bind(this);
        this.addNewAddress = this.addNewAddress.bind(this);
    }

    addNewAddress(){
        let checkLogin =localStorage.getItem("tokenCustomer");
        if(checkLogin!= null){

            if(window.jQuery("#phone").val()=== ''){
                window.jQuery('.message-error').html('Please inform your Address');
                window.jQuery('.message-error').show('slow');   
                window.jQuery("#phone").focus();
                return false;
            }else if(window.jQuery("#address").val() === ''){
                window.jQuery('.message-error').html('Please inform your Phone');
                window.jQuery('.message-error').show('slow');  
                window.jQuery("#address").focus();
                return false; 
            }else if(window.jQuery("#city").val() === ''){
                window.jQuery('.message-error').html('Please inform your Country');
                window.jQuery('.message-error').show('slow');   
                window.jQuery("#city").focus();
                return false;
            }else if(window.jQuery("#country").val() === ''){
                window.jQuery('.message-error').html('Please inform your City');
                window.jQuery('.message-error').show('slow');  
                window.jQuery("#country").focus();
                return false; 
            }
            let data = {
                token: checkLogin,
                address:window.jQuery("#address").val(),
                phone:window.jQuery("#phone").val(),
                city:window.jQuery("#city").val(),
                country:window.jQuery("#country").val(),
            }
            Api.get("http://127.0.0.1:8000/addAddressToCustomer", data)
            .then((result) => {
                if(result.status){
                    window.jQuery('.message-error').addClass('alert');
                    window.jQuery('.message-error').addClass('alert-success');
                    window.jQuery('.message-error').html('Add New Address Success. Please refresh page');
                    window.jQuery('.message-error').show('slow');   
                }
            })
        }else{
            window.location.assign("/");
        }
    }

    buildContent(){
        let _content = [];
    
        _content.push(<Col key={3} lg={12}>
            <ul id="account-shipping">
                <li><strong>Address Default</strong></li><hr/>
            </ul>
        </Col>);
        
        _content.push(<Col key={2} lg={12}>
            <Table  className="table table-hover table-condensed">
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>City Country</th>
                        <th>Ajust</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody id="my-order">
                   
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan="7">
                            
                            <a href="#add" className="btn btn-info add-more-address"><i className="fa fa-angle-left"></i>
                                Add More Address<span className="glyphicon glyphicon-shopping-cart"></span></a>
                        </td>
                    </tr>
                    </tfoot>
                    
            </Table>
            <div className="alert alert-warning message-error">
                </div>
        </Col>);
        _content.push(<h3 className="title-page form-add-new-address"key={1.2}> Form Add New Address</h3>);
        _content.push(
            
            <Form className="form-add-new-address" key={4}>
                <FormGroup>
                    <FormControl type="input" id="phone" placeholder="Input your Phone"></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="input" id="address" placeholder="Input your address"></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="input" id="city" placeholder="Input your city"></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="input" id="country" placeholder="Input your country"></FormControl>
                </FormGroup>
                <FormGroup>
                    <FormControl type="button" onClick={this.addNewAddress} id="btn-update" className="btn-warning" value="Add More Address"></FormControl>
                </FormGroup>
                
            </Form>
        )
        

        let _contentAll = [];
        _contentAll.push(<Row className="row is-flex account-info-general" key={1}>{_content}</Row>);
        return _contentAll;
    }

    loadInfoUser(){
        let checkLogin =localStorage.getItem("tokenCustomer");
        if(checkLogin!= null){
          let data = {
            token: checkLogin
          }
            Api.get("http://127.0.0.1:8000/checkLogin", data)
            .then((result) => {
                if(result.status){
                    let htmlInfo = '';
                    let htmlShipping = '';
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
                        name = '';
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
                    
                    let listAddress= result.address;

                   

                    for(let i =0;i< listAddress.length;i++){
                        if(listAddress[i].status===1){
                            htmlShipping += '<li>Default Shipping Address: ' + listAddress[i].address + '</li>\n' +
                            '<li>Phone: ' + listAddress[i].phone + '</li>\n' +
                            '<li>City: ' + listAddress[i].city + '</li>\n' +
                            '<li>Country: ' + listAddress[i].country + '</li>\n' +
                            '<li class="error-message-shipping" style="margin-top:10px;display: none"></li>\n';    
                            continue;    
                        }
                        htmlInfo+= ' <tr id="'+listAddress[i].id+'"><td>'+i+'</td><td>'+listAddress[i].address+'</td><td>'+listAddress[i].phone+'</td><td>'+listAddress[i].city+' '+listAddress[i].country+'</td> <td><button class="btn btn-info btn-set-default">Set Default</button></td><td><button class="btn btn-warning btn-delete">Delete</button></td></tr>';
                    }
                    window.jQuery('#my-order').append(htmlInfo);
                    window.jQuery(".btn-delete").click(function(){
                        let data ={
                            token:checkLogin,
                            id_address: window.jQuery(this).parent().parent().attr('id'),
                        }
                        Api.get("http://127.0.0.1:8000/deleteAddressToCustomer", data)
                        .then((result) => {
                            if(result.status){
                               
                                window.jQuery('.message-error').addClass('alert');
                                window.jQuery('.message-error').addClass('alert-success');
                                window.jQuery('.message-error').html('Delete Address Success. Please refresh page');
                                window.jQuery('.message-error').show('slow');   
                            }
                        })
                    });
                    window.jQuery(".btn-set-default").click(function(){
                        let data ={
                            token:checkLogin,
                            id_address: window.jQuery(this).parent().parent().attr('id'),
                        }
                        Api.get("http://127.0.0.1:8000/setAddressToCustomer", data)
                        .then((result) => {
                            if(result.status){
                                
                                window.jQuery('.message-error').addClass('alert');
                                window.jQuery('.message-error').addClass('alert-success');
                                window.jQuery('.message-error').html('Set Address Success. Please refresh page');
                                window.jQuery('.message-error').show('slow');   
                            }
                            
                        });
                    });
                    window.jQuery('#account-shipping').append(htmlShipping);
                    if(check){
                        window.jQuery('.error-message').addClass('alert');
                        window.jQuery('.error-message').addClass('alert-warning');
                        window.jQuery('.error-message').html('You should fill information full to use all our service');
                        window.jQuery('.error-message').show('slow');
                    }
                    
                }
            })
        }else{
            window.location.assign("/");
        }
    }
     
    componentDidMount(){
        this.loadInfoUser();
        window.jQuery('.form-add-new-address').hide();
        window.jQuery('.add-more-address').click(function(){
            window.jQuery('.table').fadeOut();
            window.jQuery('.form-add-new-address').fadeIn();
        })

        window.jQuery("#address").keyup(function(){
            window.jQuery('.message-error').fadeOut('slow');  
        });
        window.jQuery("#phone").keyup(function(){
            window.jQuery('.message-error').fadeOut('slow');  
        });
        window.jQuery("#country").keyup(function(){
            window.jQuery('.message-error').fadeOut('slow');  
        });
        window.jQuery("#city").keyup(function(){
            window.jQuery('.message-error').fadeOut('slow');  
        })
    }


    render() {
        return (
            <div>
                {this.state.content}
                
            </div>
        );
    }
}

export default AddressBook;

