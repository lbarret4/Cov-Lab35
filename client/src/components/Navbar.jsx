import React, { Fragment, Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthButton from './auth/authButton';
import { isLoggedIn } from '../services/user';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            home: '',
            authors: '',
            post: '',
            contact: '',
            login: '',
            entry: {
                view:'invisible',
                path:'/blogs'
            }
        };



    }

    setVisible(path) {
        if (this.state.entry.view === 'invisible') {
            this.setState({
                entry: {
                    view:'visible',
                    path
                }

            });
        }
    }
    setInvisible() {
        if (this.state.entry.view === 'visible') {
            this.setState({
                entry:{
                    view:'invisible',
                    path:'/blogs'
                }
            });
        }
    }



    render() {
        const visibility = (match,location) => {
            if (!match) {
                this.setInvisible();
                return false;
            }           
            this.setVisible(location.pathname);
            return true;
        };

        let navList = Object.getOwnPropertyNames(this.state).map((st) => {
            let path = `/${st}`;
            let link;

            if (st === 'home') {
                link = (<NavLink exact to='/' className='nav-link' activeClassName='active' >{st[0].toUpperCase() + st.substring(1)}</NavLink>);
            } else if (st === 'entry') {
                link = (<NavLink strict to={this.state[st]['path']} className={`nav-link ${this.state[st]['view']}`} activeClassName='active' isActive={visibility} >{st[0].toUpperCase() + st.substring(1)}</NavLink>);
            } else if (st === "login") {

                link = <AuthButton />;

            }else if (st === 'post' ){

                link = isLoggedIn()? (<NavLink to={path} className='nav-link' activeClassName='active' >{st[0].toUpperCase() + st.substring(1)}</NavLink>) :null;
            }else {
                link = (<NavLink to={path} className='nav-link' activeClassName='active' >{st[0].toUpperCase() + st.substring(1)}</NavLink>);
            }
            return (
                <li className="nav-item">
                    {link}
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


