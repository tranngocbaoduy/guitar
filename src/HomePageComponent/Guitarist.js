import React, { Component } from 'react';
import {Row,Col,Button,Image,Grid } from 'react-bootstrap';

class Guitarist extends Component {
  render() {
    return (
        <div className="new-product">
            <Grid>
                <Row className="my-row">
                    <Col sm={3} lg={3} md={3} xs={3} >
                        <hr className="line-decoration"/>
                    </Col>
                    <Col sm={6} lg={6} md={6} xs={6} >
                        <h1 className="unit"><b>GUITAR FAMOUS</b></h1>
                    </Col>
                    <Col sm={3} lg={3} md={3} xs={3} >
                        <hr className="line-decoration"/>
                    </Col>
                </Row>
            <br/><br/>
                <Row className="my-guitarist">
                    <Col sm={4} lg={4} md={4} xs={4} >
                        <Image src="assets/images/introduce/musician-1.png" alt="" width="95%"></Image>
                        <h4 className="title"><strong>Jimmy Page</strong></h4>
                        <p>James Patrick Page is an English musician, songwriter, and record producer who achieved international success as the guitarist and founder of the rock band Led Zeppelin.</p>
                    </Col>
                    <Col sm={4} lg={4} md={4} xs={4}  >
                        <Image src="assets/images/introduce/musician-2.png" alt="" width="95%"></Image>
                        <h4 className="title"><strong>Eric Clapton</strong></h4>
                        <p>Eric Patrick Clapton is an English rock and blues guitarist, singer and song writer. He is the only three-time inductee to the Rock and Roll Hall of Fame.</p>
                    </Col>
                    <Col sm={4} lg={4} md={4} xs={4} >
                        <Image src="assets/images/introduce/musician-3.png" alt="" width="95%"></Image>
                        <h4 className="title"><strong>Stevie Ray Vaughan</strong></h4>
                        <p>Stephen "Stevie" Ray Vaughan was an American musician, singer, songwriter, and record producer.</p>
                    </Col>
                        
                </Row>
                <Row className="my-row" >
                    <Col sm={5} lg={5} md={5} xs={5} >
                    </Col>
                    <Col sm={2} lg={2} md={2} xs={2} >
                        <Button className="btn-more">More</Button>
                    </Col>
                    <Col sm={5} lg={5} md={5} xs={5} >
                    </Col>
                </Row>
            </Grid>
        </div>
    );
  }
}

export default Guitarist;

