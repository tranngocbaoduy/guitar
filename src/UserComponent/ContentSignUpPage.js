import React from 'react';
import '../App.css';
import {Row,Col,Button,FormGroup,Grid,Form,FormControl} from 'react-bootstrap';
import '../css/loginPage.css';
import Api from '../Api';

class ContentLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
        }
        this.signUpUser = this.signUpUser.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    

    signUpUser(){
        if (!this.validateEmail( window.jQuery('#email').val() )) {
            window.jQuery('.message-error').html('Invalid Email. Format Email : abc@gmail.com');
            window.jQuery('.message-error').show('slow');
            window.jQuery('#email').focus();
            return false;
        }
        if ( window.jQuery('#password').val() === '') {
            window.jQuery('.message-error').html('Please enter your password');
            window.jQuery('.message-error').show('slow');
            window.jQuery('#password').focus();
            return false;
        }
        if ( window.jQuery('#re-password').val() === '') {
            window.jQuery('.message-error').html('Please enter your re-password');
            window.jQuery('.message-error').show('slow');
            window.jQuery('#re-password').focus();
            return false;
        }
        if (! window.jQuery('#cb-accept').is(':checked')) {
            window.jQuery('.message-error').html('Please accept our Term & Condition');
            window.jQuery('.message-error').show('slow');
            window.jQuery('#cb-accept').focus();
            return false;
        }
    
    
        let data = {
            email:  window.jQuery("#email").val(),
            password:  window.jQuery("#password").val(),
            rePass:  window.jQuery("#re-password").val(),
            receiveMail: true,
        }
        
        Api.get("http://127.0.0.1:8000/customerSignUp", data)
        .then((result) => {
            if(result.status){
                alert('Sign Up Success. Please Sign In');
                window.location.assign('/login');
            }else{
                window.jQuery('.message-error').addClass('alert');
                window.jQuery('.message-error').addClass('alert-warning');
                window.jQuery('.message-error').html(result.message);
                window.jQuery('.message-error').show('slow');   
            }
        })
    
    }
    buildContent(){
        
        let _subContent = [];
        let _content = [];

        _subContent.push( <Col key={1.1} lg={3} md={2} sm={1} xs={1}></Col>);
        _subContent.push( <Col key={1.2} lg={6} md={8} sm={10} xs={10}><h1 className="title-page"><b>ONE LOGIN TO ALL SERVICE</b></h1></Col>);
        _subContent.push( <Col key={1.3} lg={3} md={2} sm={1} xs={1}></Col>);

       
        _content.push(<Grid key={7}><Row key={1} className="">{_subContent}</Row></Grid>);
        let _formContent = [];

        _formContent.push(
        <Form key={12}>
            <FormGroup>
                <FormControl type="text" id="email" placeholder="Enter email" name="email"/>
            </FormGroup>
            <FormGroup >
                <FormControl type="password"  id="password" placeholder="Enter password"
                    name="password"/>
            </FormGroup>
            <FormGroup >
                <FormControl type="password" id="re-password" placeholder="Enter Re-password"
                    name="re-password"/>
            </FormGroup>
            <FormGroup>
                <div className=" alert alert-warning message-error " >
                </div>
                <input className="check-box-accept" type="checkbox" id="cb-accept"/> I accept the Terms and
                Condition
            </FormGroup>
            <FormGroup>
                <input type="checkbox" id="cb-agree"/> I agree to receive email & phone communications
            </FormGroup>
            <Button type="button" onClick={this.signUpUser} className="btn btn-default btn-submit">Register</Button>
        </Form>);


        let _contentRow = [];
        _contentRow.push(<Row key={2.4} className="row form-login-input">{_formContent}</Row>)
        

        let _subContentLeft = [];
        _subContentLeft.push(<h4 key={111} className="h4-title-login-with-social-media">Login via social media</h4>);
        _subContentLeft.push(<Col key={5.3} lg={6} md={6} sm={6} xs={6}>
        <Button type="button" className="btn btn-default btn-google">Google</Button></Col>);
        _subContentLeft.push( <Col key={5.4}  lg={6} md={6} sm={6} xs={6}>
        <Button type="button" className="btn btn-facebook">Facebook</Button></Col>);

        _contentRow.push( <Row key={2.5} className="row btn-login-with-social-media">{_subContentLeft}</Row>);

        _subContent = [];

        _subContent.push(<Col key={2.1} className="col-lg-4" lg={4}></Col>);
        _subContent.push(<Col key={2.2} className="col-lg-4 login-input" lg={4}>{_contentRow}</Col>);
        _subContent.push(<Col key={2.3} className="col-lg-4" lg={4}></Col>);

        
        _content.push(<Grid key={6}><Row key={2}>{_subContent}</Row></Grid>);
        return _content;
       

    }


    componentDidMount(){
        window.jQuery("#email").keyup(function () {
            window.jQuery('.message-error').hide('slow');
        });
        window.jQuery("#password").keyup(function () {
            window.jQuery('.message-error').hide('slow');
        });
        window.jQuery("#re-password").keyup(function () {
            if ( window.jQuery('#re-password').val() !== window.jQuery('#password').val()) {
                window.jQuery('.message-error').html('Password isn\'t match');
                window.jQuery('.message-error').show('slow');
                window.jQuery('#re-password').focus();
        
            } else {
                window.jQuery('.message-error').hide('slow');
            }
        });
        window.jQuery('#cb-accept').click(function(){
            window.jQuery('.message-error').hide('slow');
        })
       
    }

    render() {
      return (
          <div>
               <Grid>
                {this.buildContent()}
                </Grid>
          </div>
      );
  }
}

export default ContentLoginPage;
