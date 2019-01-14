import React from 'react';
import '../App.css';
import {Row,Col,Button,FormGroup,Form,FormControl,Image,Grid} from 'react-bootstrap';
import '../css/contactPage.css';
class ContentContactPage extends React.Component {
    render() {
        return (
            <div>
                <Grid>
                <Row >
                    <Col className="col-lg-3 col-md-2 col-sm-1 col-xs-1"></Col>
                    <Col className="col-lg-6 col-md-8 col-sm-10 col-xs-12">
                        <h1 className="title-page"><b>CONTACT US</b></h1>
                    </Col>
                    <Col className="col-lg-3 col-md-2 col-sm-1 col-xs-1"></Col>
                </Row>
                
                    <Row >
                        <Col lg={1} md={1} sm={1} xs={1}></Col>
                        <Col lg={6} md={7} sm={7} xs={12}>
                        <p className="p-contact">Contact us via any of the following methods during our business hours<br/>Monday - Fridat 8:30 AM -
                            5:30 PM Pacific Time<br/>Services@gamingzone.com<br/>Phone: 1-(626)-854-9338 op. 4</p>
        
                        <Form  className="my-contact">
        
                            <FormGroup >
                                <FormControl type="email" id="email" placeholder="Your email" name="email"
                                    />
                            </FormGroup>
                            <FormGroup  >
                                <FormControl id="phone" placeholder="Your phone" name="phone"/>
                            </FormGroup>
                            <FormGroup >
                                <textarea className="form-control" id="message" placeholder="Your message" name="message" rows="5"
                                        cols="20"></textarea>
                            </FormGroup>
                            <div className="alert alert-warning message-error" >
                            </div>
                            <Button type="button" className="btn btn-default btn-send-email">
                                SEND
                            </Button>
                        </Form>
        
        
                        </Col>
                        <Col lg={5} md={4} sm={4} xs={12}>
                            <Image className="logo" width="30%" src="assets/images/common/logo.png"></Image>
                        </Col>
                    </Row>
                </Grid>
            </div>
          );
      }

}

export default ContentContactPage;
