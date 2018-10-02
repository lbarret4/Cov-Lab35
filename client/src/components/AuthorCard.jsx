import React, { Component, Fragment } from 'react';
import Card from './Card';
class AuthorCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {        
        let h1 = <h1>Authors</h1>;
        return (
            <Fragment>
               < Card header={h1}/>
            </Fragment>
        );
    }


}

export default AuthorCard;