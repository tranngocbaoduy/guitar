import React from 'react';
import '../App.css';
import {Row,Col,Button,Grid,FormGroup,Form,FormControl} from 'react-bootstrap';
import '../css/loginPage.css';
import Api from '../Api';

class ContentLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            contentLogin: [],
        }
        this.login = this.login.bind(this);
        this.loadLogin = this.loadLogin.bind(this);
      }
      
    login() {
        let data = {
            email: window.jQuery("#email").val(),
            password: window.jQuery("#password").val(),
        }
        Api.get("http://127.0.0.1:8000/customerLogin", data)
                .then((result) => {
                    console.log(result)
                    if(result.status){
                        localStorage.setItem('tokenCustomer',result['token']);
                        window.location.assign('/');
                    }else{
                        window.jQuery('.message-error').html( 'Email or Password isn\'t correct');
                        window.jQuery('.message-error').show('slow');
                        window.jQuery('#email').focus();
                    }
                })
    }
      
    loadLogin(){
        let checkLogin = localStorage.getItem("tokenCustomer");
    
        if(checkLogin!= null){
    
          let data = {
            token: checkLogin
          }
          Api.get("http://127.0.0.1:8000/checkLogin", data)
                  .then((result) => {
                        if(result.status){
                            window.location.assign('/');
                        }
                  })
        }
    }
    componentDidMount() {
        this.loadLogin();
    }
    render() {
      return (
          <div>
              <Grid>
                    <Row className="contentPage my-row is-flex">
                        <Col lg={3} md={2} sm={1} xs={1}></Col>
                        <Col lg={6} md={8} sm={10} xs={12}>
                            <h1 className="title-page"><b>ONE LOGIN TO ALL SERVICE</b></h1>
                        </Col>
                        <Col lg={3} md={2} sm={1} xs={1}></Col>
                    </Row>
                </Grid>
                <Grid>
                    <Row className="form-login-input">
                        <Col lg={4}></Col>
                        <Col className="login-input" lg={4}>
                            <Row className="row">
                                <Form id="login-form" method="post">
                                    <FormGroup>
                                        <FormControl type="text" id="email" placeholder="Enter email"
                                            name="email" />
                                    </FormGroup>
                                    <FormGroup >
                                        <FormControl type="password" id="password" placeholder="Enter password"
                                            name="password" />
                                    </FormGroup>
                                    <FormGroup >
                                        <input className="check-box" type="checkbox" name="remember"/> Remember me
                                        <span className="forget-pass"><a href="#a">Forgot Password ?</a></span>
                                    </FormGroup>
                                    <FormGroup >
                                        <div className="alert alert-warning message-error">
                                        </div>
                                        <Button type="button" className="btn-submit" onClick={this.login}>Sign In
                                        </Button><br/>
                                        <Button type="button" href="/signUpPage" className="btn-create-new-account" >
                                            Create New Account
                                        </Button>
                                        <FormControl type="text" valuedefault="0" className="wrong-sign-in" hidden/>
                                    </FormGroup>
                                </Form>
                            </Row>
                            <Row     className="row btn-login-with-social-media">
                                <h4 className="h4-title-login-with-social-media">Login via social media</h4>
                                <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-6" lg={6} md={6} sm={6} xs={6}>
                                    <Button type="button" className="btn btn-default btn-google">Google</Button>
                                </Col>
                                <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-6" lg={6} md={6} sm={6} xs={6}>
                                    <Button type="button" className="btn btn-facebook">Facebook</Button>
                                </Col>

                            </Row>
                        </Col>
                        <Col lg={4}></Col>
                    </Row>
                </Grid>
          </div>
      );
  }
}

export default ContentLoginPage;
