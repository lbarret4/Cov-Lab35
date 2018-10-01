import React, { Component, Fragment } from 'react';
import Blog from './Blog';
class BlogFeed extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let blogs = this.props.blogs;
        let blogList = blogs.map((blog, index) => {
            if (index !== 0) {
                return (

                    <Blog blog={blog} key={blog.date + index} />

                );
            } else {
                return (
                    <div className="jumbotron jumbotron-fluid my-1">
                        <div className="container">
                            <Blog type='featured' blog={blog} key={blog.date} />
                        </div>
                    </div>
                );
            }
        });
        return (
            <Fragment>
                {blogList[0]}
                <div className="container">
                    <div className="row">
                        {blogList.slice(1)}
                    </div >

                </div>

            </Fragment >

        );
    }
}

export default BlogFeed;