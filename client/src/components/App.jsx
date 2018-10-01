import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './Home';
import BlogEdit from './BlogEdit';
import BlogCard from './BlogCard'


class Navigation extends Component {

    render() {
        return (
            <Router>
                <Fragment>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/post" component={BlogEdit} />
                            <Route exact path="/blogs/:id/entry" component={BlogCard} key={"/blogs/:id/entry"} />
                            <Route exact path="/authors" component={BlogCard} key={"/authors"} />
                            <Route exact path="/contact" component={BlogCard} key={"/contact"} />
                        </Switch>
                        <hr />
                    </div>
                </Fragment>
            </Router>
        )
    }
}


export default Navigation;