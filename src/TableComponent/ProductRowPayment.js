import React from 'react';
import {Image} from 'react-bootstrap';
class ProductRowPayment extends React.Component {
    render() {
        let image = '/assets/images/product/'+this.props.data.image;
        return (
            
                <tr>
                    <td width="60%"><Image width="30%" src={image}></Image></td> 
                    <td width="20%">{this.props.data.quantity}</td> 
                    <td width="20%">{this.props.data.subtotal}</td> 
                </tr>
        );
    }
}

export default ProductRowPayment;