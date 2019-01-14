import React from 'react';
import {Image} from 'react-bootstrap';
class ProductRow extends React.Component {
    render() {
        let image = '/assets/images/product/'+this.props.data.image;
        return (
                <tr className={this.props.data.class}>
                    <td width="20%">{this.props.data.created_at}</td> 
                    <td width="30%"><Image width="30%" src={image}></Image></td> 
                    <td width="10%">{this.props.data.name}</td> 
                    <td width="10%">{this.props.data.quantity}</td> 
                    <td width="20%">$ {this.props.data.price}</td> 
                    <td width="20%">$ {this.props.data.subtotal}</td>
                    <td width="20%"><button type="btn" className="btn-warning" onClick={"/viewOrder/"+ this.props.data.id}>View</button></td>
                </tr>
        );
    }
}

export default ProductRow;