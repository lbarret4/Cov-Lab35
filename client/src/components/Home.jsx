import React, { Component, Fragment } from 'react';
import BlogFeed from './BlogFeed';
import * as blogsService from '../services/blogs';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogList: []
        };
    }

    async componentDidMount() {

        try {
            let data = await blogsService.all();
            data = await data.map((item) => {
                item.date = new Date(item['_created']);
                delete item["_created"];
                return (item);
            });
            this.setState({
                blogList: await data
            });
        } catch (error) {
            console.log(error);
        }



    }



    render() {
        return (
            <Fragment>
                <main role="main">

                    <BlogFeed blogs={this.state.blogList} />

                </main>

                <footer className="container">
                </footer>
            </Fragment>
        );
    }
}

export default Home;