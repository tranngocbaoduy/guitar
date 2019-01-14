import React, { Component } from 'react';
import {Carousel} from 'react-bootstrap';

class MyCarousel extends Component {
  render() {
    return (
      <div  className="myCarousel">
          <Carousel className="carousel">
            <Carousel.Item>
                <img width={1920}  alt="900x500" src="/assets/images/carousel/carousel.png" />
                <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={1920} alt="900x500" src="/assets/images/carousel/carousel1.png" />
                <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={1920} alt="900x500" src="/assets/images/carousel/carousel2.png" />
                <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>;
      </div>
    );
  }
}

export default MyCarousel;

