import React from 'react';
import {Image} from 'react-bootstrap';
class ProductRowSearch extends React.Component {
    render() {
        return (      
                <tr>
                    <td width="50%"><Image width="30%" src={this.props.data.image}></Image></td> 
                    <td width="50%">{this.props.data.name}</td> 
                </tr>
        );
    }
}

export default ProductRowSearch;