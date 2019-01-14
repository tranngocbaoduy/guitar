import React, { Component } from 'react';
import Page from '../Page';
import ContentInfoUser from '../UserInfoComponent/ContentInfoUser';


class UserPage extends Component {
    constructor(props){
        super(props);
        this.state={
          content:[],
        }
    }

    buildContent(){

        let _content = [];
        _content.push(<ContentInfoUser key={2}></ContentInfoUser>);
        
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

export default UserPage;
