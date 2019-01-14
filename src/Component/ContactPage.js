import React, { Component } from 'react';
import Page from '../Page';
import ContentContactPage from '../UserComponent/ContentContactPage';


class ContactPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
        }
    }

    buildContent(){

        let _content = [];
        _content.push(<ContentContactPage key={2}></ContentContactPage>);
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

export default ContactPage;
