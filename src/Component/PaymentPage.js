import React, { Component } from 'react';
import Page from '../Page';
import ContentPaymentPage from '../UserComponent/ContentPaymentPage';


class PaymentPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
        }
    }

    buildContent(){

        let _content = [];
        _content.push(<ContentPaymentPage key={2}></ContentPaymentPage>);
        return _content;
    }

    componentDidMount(){
        this.setState({
            content: this.buildContent(),
        });
    }

    render() {
        return (
            <div>
             <Page content={this.state.content}></Page>
            </div>
        );
    }
}

export default PaymentPage;
