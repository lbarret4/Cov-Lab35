
import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import Tags from './Tags';
import { Redirect } from 'react-router-dom';



class BlogEdit extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlesClose = this.handlesClose.bind(this);
        this.state = {
            redirect: false

        }
    }

    handleSubmit(e) {
        alert('submitted post');
        let tags = []
        let blog = {};
        let url1 = 'http://localhost:3000/api/blogs';
        let url2 = 'http://localhost:3000/api/blogs/blogtags/';
        let options = {
            method: 'Post',
            body: '',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        for (let item of e.target) {
            if (item.type === 'checkbox' && item.checked && item.name !== 'other') tags.push(item.id);
            if (item.type === 'text' && item.name !== 'otherText') blog.title = item.value;
            if (item.type === 'textarea') blog.content = item.value;
        }

        options.body = JSON.stringify(blog);
        (async () => {
            try {
                let res1 = await fetch(url1, options);
                res1 = await res1.json();
                let id = await res1.id;
                tags.forEach(async (element) => {

                    let blogTag = {};
                    blogTag.blogid = id;
                    blogTag.tagid = element;

                    options.body = JSON.stringify(blogTag);
                    let res2 = await fetch(url2, options);
                });
            } catch (error) {
                console.log(error);
            }

        })();

        e.preventDefault();
        this.setState({
            redirect: true
        });

    }

    handlesClose(e) {
        e.preventDefault();
        this.props.history.goBack();
    }



    render() {

        return (
            <Fragment>
                {this.state.redirect ? <Redirect to="/" /> : <Navbar tab='post' />}
                <div className="modal-content my-1">
                    <div className="modal-header">
                        <h5 className="modal-title">Post a blog</h5>
                        <button type="button" className="close" onClick={this.handlesClose}>
                            <span ariaHidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="blog_title" placeholder="Blog Title" />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Blog" />

                            </div>
                            <Tags />
                            <div className="modal-footer">

                                <button type="submit" className="btn btn-primary" >Save changes</button>
                            </div>

                        </form>


                    </div>
                </div>
            </Fragment>
        );

    }
}

export default BlogEdit;