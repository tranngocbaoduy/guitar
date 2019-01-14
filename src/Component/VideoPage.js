import React, { Component } from 'react';
import Page from '../Page';
import ContentVideoPage from '../UserComponent/ContentVideoPage';


class ContactPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
        }
    }

    buildContent(){

        let _content = [];
        _content.push(<ContentVideoPage key={2}></ContentVideoPage>);
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
