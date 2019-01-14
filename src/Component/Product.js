import React from 'react';

class Product extends React.Component {
    render() {
        let image = '/assets/images/product/'+this.props.data.image;
        return (
            <div className="product-item">
                <img src={image} alt="" className="product"/>
                <h4 className="title"><strong>{this.props.data.name}</strong></h4>
                <p>This is my Guitar. Don't sell<br/>{this.props.data.price}</p>    
            </div>
        );
    }
}

export default Product;