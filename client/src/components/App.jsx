import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import BlogEdit from './BlogEdit';
import BlogCard from './BlogCard'
import AuthorCard from './AuthorCard';
import ContactCard from './ContactCard';
import Navbar from './Navbar';
import Login from './auth/login';
import Logout from './auth/logout';
import PrivateRoute from './auth/privateRoute';


class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <div className="container">
                        <Navbar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/authors" component={AuthorCard} key={"/authors"} />
                            <Route exact path="/contact" component={ContactCard} key={"/contact"} />
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            <Route exact path="/blogs/:id/" component={BlogCard} key={"/blogs/:id/"} />

                            <PrivateRoute exact path="/post" component={BlogEdit} />
                            
                        </Switch>
                        <hr />
                    </div>
                </Fragment>
            </Router>
        )
    }
}


export default Navigation;