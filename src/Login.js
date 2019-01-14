import React from 'react';
import {Form,FormControl,FormGroup,ControlLabel,Col,Button,Checkbox} from 'react-bootstrap';

class Login extends React.Component{
    render(){
        return(
            <div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                    <Col componentClass={ControlLabel} sm={3}>
                      Email
                    </Col>
                    <Col sm={7}>
                      <FormControl type="email" placeholder="Email" />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={3}>
                      Password
                    </Col>
                    <Col sm={7} >
                      <FormControl type="password" placeholder="Password" />
                    </Col>
                  </FormGroup>

                  <FormGroup inline="true">
                    <Col smOffset={3} sm={6} lg={5}>
                      <Button type="submit" href="/">Sign in</Button>
                    </Col>
                    <Col sm={6} lg={4}>
                      <Checkbox>Remember me</Checkbox>
                    </Col>
                    
                  </FormGroup>

                  <FormGroup>
                    
                  </FormGroup>
                </Form>;
            </div>
        );
    }
}

export default Login;