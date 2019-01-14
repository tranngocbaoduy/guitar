import React from 'react';
import Page from '../Page';


class IntroductPage extends React.Component {
    render() {
        const _content = [];
        _content.push(
            <div key="test">Gioi Thieu</div>
        )
        return (
            <div>
                <Page _content={_content}>

                </Page>
            </div>
        )
    }
}

export default IntroductPage;