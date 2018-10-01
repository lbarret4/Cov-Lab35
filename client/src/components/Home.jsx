import React, { Component, Fragment } from 'react';
import BlogFeed from './BlogFeed';
import Navbar from './Navbar';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blogList: []
        };
    }

    async componentDidMount() {
        let url = `http://localhost:3000/api/blogs`;
        try {
            let results = await fetch(url);
            let data = await results.json();
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
                <Navbar />
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