import React, { Component } from 'react';
import {Row,Col,Table} from 'react-bootstrap';
import Api from '../Api';
import '../css/contactPage.css';
import ProductRowOrder from '../TableComponent/ProductRowOrder';

class InfoOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [],
            contentBill:[],
        }
        this.loadOrder = this.loadOrder.bind(this);
    }

    loadOrder(){
        let checkLogin = localStorage.getItem("tokenCustomer");
       
        if(checkLogin!= null){
          let data = {
            token: checkLogin
          }
            Api.get("http://127.0.0.1:8000/getInfoOrder", data)
            .then((result) => {
                console.log(result)
                if(result.status){
                    let colorTable = ['success','warning','info'];
                    let htmlProductByBill ='';
                    let num =0;
                    let _content = [];
                    let listBill = result['listProductOrdered'];
                    for(let i = 0; i< listBill.length;i++){
                        if(num >2 ){
                            num = 0;
                        }
                        for(let j=0; j< listBill[i].length;j++){
                            let data={
                                class: colorTable[parseInt(num)],
                                created_at: listBill[i][j]['created_at'],
                                image: listBill[i][j]['image'],
                                name: listBill[i][j]['name'],
                                price: listBill[i][j]['price'],
                                quantity: listBill[i][j]['quantity'],
                                subtotal: listBill[i][j]['quantity']*listBill[i][j]['price'],
                                id: listBill[i][j]['id'],
                            }
                            _content.push(<ProductRowOrder key={i+j} data={data}></ProductRowOrder>);
                        }
                        num++;
                    }
                   
                    this.setState({
                        contentBill: _content,
                    })
                }
            })
        }else{
            window.location.assign("/");
        }
    }
     
    componentDidMount(){
        this.loadOrder();
    }


    render() {
        return (
            <div>
                <Row className="row is-flex account-info-general">
                    <Col lg={12}>
                    <Table id="cart" className="table table-hover table-condensed">
                        <thead>
                        <tr>
                            <th>Order At.</th>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th className="text-center">Subtotal</th>
                            <th >Ajust</th>
                        </tr>
                        </thead>
                        <tbody id="my-order">
                            {this.state.contentBill}
                       
                        <tr>
                            <td colSpan="7">
                                You're not use to order
                                <a href="/" className="btn btn-warning"><i className="fa fa-angle-left"></i>
                                    Go Shopping Now<span className="glyphicon glyphicon-shopping-cart"></span></a>
                            </td>
                        </tr>
                        </tbody>
                        <tfoot>
                        </tfoot>
                    </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default InfoOrder;

