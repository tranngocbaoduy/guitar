import React, { Component } from 'react';
import {Row,Col } from 'react-bootstrap';
import Api from '../Api';
import '../css/contactPage.css';
import InfoPersonal from './InfoPersonal';

class InfoRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
        }
        this.loadInfoUser = this.loadInfoUser.bind(this);
        this.adjustUser = this.adjustUser.bind(this);
    }

    adjustUser(){
        let _content = [];
        _content.push(<InfoPersonal key={5}></InfoPersonal>)
        this.setState({
            content: _content
        });
    }

    buildContent(){
        let _content = [];
        _content.push(<Col key={2} lg={5}>
            <ul  id="account-info">
                <li><strong>Personal Profile</strong> | <a href="#ajustUser" onClick={this.adjustUser}>EDIT</a></li>
                <hr></hr>
            </ul>
        </Col>);

        _content.push(<Col key={3} lg={7}>
            <ul id="account-shipping">
                <li><strong>Address Book</strong></li><hr/>
            </ul>

        </Col>);

        let _contentAll = [];
        _contentAll.push(<Row className="row is-flex account-info-general" key={1}>{_content}</Row>);
        return _contentAll;
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
                        city = '';
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
    
                    if(check){
                        window.jQuery('.error-message').addClass('alert');
                        window.jQuery('.error-message').addClass('alert-warning');
                        window.jQuery('.error-message').html('You should fill information full to use all our service');
                        window.jQuery('.error-message').show('slow');
                    }
                    
                    htmlInfo += '<li>Name: ' + name + '</li>\n' +
                        '<li>Address: ' + address + '</li>\n' +
                        '<li>Email: ' + email + '</li>\n' +
                        '<li>Phone: ' + phone + '</li>\n' +
                        '<li class="error-message" style="margin-top:10px;display: none"></li>\n';
                    window.jQuery('#account-info').append(htmlInfo);
    
                    Api.get("http://127.0.0.1:8000/getAddressDefault", data)
                        .then((result) => {
                            if(result.status){
                                let item = result.addressDefault;
                                htmlShipping += '<li>Default Shipping Address: ' + item.address + '</li>\n' +
                                '<li>Phone: ' + item.phone + '</li>\n' +
                                '<li>City: ' + item.city + '</li>\n' +
                                '<li>Country: ' + item.country + '</li>\n' +
                                '<li class="error-message-shipping" style="margin-top:10px;display: none"></li>\n';
                                
                                window.jQuery('#account-shipping').append(htmlShipping);
                            }
                        })
                  
    
                    
                    
                    
                }
            })
        }else{
            window.location.assign("/");
        }
    }
     
    componentDidMount(){
        this.loadInfoUser();
        this.setState({
            content:this.buildContent()
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

export default InfoRight;

