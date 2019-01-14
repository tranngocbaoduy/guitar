import React from 'react';

import '../App.css';
import InfoRight from './InfoRight';
import NavigationLeft from './NavigationLeft';
import {Row,Col,Grid} from 'react-bootstrap';
import MoreProductByCategory from '../HomePageComponent/MoreProductByCategory';

class ContentProductDetailPage extends React.Component {
 
  render() {
      return (
          <div>
            <Grid>
              <Row className={'my-row contentPage'}>
                <Col lg={3} md={3} sm={4} >
                  <NavigationLeft></NavigationLeft>
                </Col>
                <Col lg={9} md={9} sm={8} xs={10} xsPush={1} smPush={0}>
                  <InfoRight productId={this.props.productId}></InfoRight>
                </Col>
              </Row>
            </Grid>
            <MoreProductByCategory productId={this.props.productId}></MoreProductByCategory>
          </div>
      );
  }
}

export default ContentProductDetailPage;
