import React, { Component } from 'react';
import Page from '../Page';
import ContentSignUpPage from '../UserComponent/ContentSignUpPage';


class SignUpPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
        }
    }

    buildContent(){

        let _content = [];
        _content.push(<ContentSignUpPage key={2}></ContentSignUpPage>);
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

export default SignUpPage;
