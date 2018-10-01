import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home: 'active',
            authors: '',
            post: '',
            contact: '',

        };


        this.handlesOnClick = this.handlesOnClick.bind(this);
    }

    componentDidMount() {
        if (this.props.tab) {
            this.setState({
                home: '',
                [this.props.tab]: 'active'
            })
        }

    }

    handlesOnClick(tab, e) {

        for (let state in this.state) {

            if (this.state[state] === 'active' && state !== tab) {
                this.setState({
                    [state]: ' '
                });

            } else if (state === tab) {
                this.setState({
                    [state]: 'active'
                });

            }
        }



    }

    render() {
        let tab = this.props.tab;
        let tabPath = this.props.path;
        let navList = Object.getOwnPropertyNames(this.state).map((st) => {
            let path = (tab && tabPath && tab === st ? tabPath : `/${st}`);
            return (
                <li className="nav-item">
                    <Link className={`nav-link ${this.state[st]}`} to={st === 'home' ? '/' : path} onClick={this.handlesOnClick.bind(this, st)}>{st[0].toUpperCase() + st.substring(1)}</Link>
                </li>);
        })


        return (

            <nav className=" bg-light" >
                <ul className="nav nav-tabs">
                    {navList}
                </ul>
            </nav >

        );
    }
}



export default Navbar;


