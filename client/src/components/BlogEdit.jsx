
import React, { Component, Fragment } from 'react';
import Tags from './Tags';
import { Redirect } from 'react-router-dom';
import * as blogsService from '../services/blogs';
import * as blogtagsService from '../services/blogtags';


class BlogEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        }
        if (this.props.edit) {
            this.state.title = null;
            this.state.content = null;

        }
        this.handlesEdit = this.handlesEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlesClose = this.handlesClose.bind(this);
    }

    // componentWillMount() {
    //     if(this.props.edit) {
    //         this.setState({
    //             title: this.props.blog ? '' : this.props.blog.title
    //         })
    //     }
    // }

    componentDidUpdate() {
    
        if(this.props.edit && this.props.blog && this.state.title === null && this.state.content === null) {
                    this.setState({
                        title:this.props.blog.title,
                        content:this.props.blog.content
                    })
                }

    }

    handleSubmit(e) {
        alert('submitted post');
        let tags = []
        let blog = {};
        for (let item of e.target) {
            if (item.type === 'checkbox' && item.checked && item.name !== 'other') tags.push(item.id);
            if (item.type === 'text' && item.name !== 'otherText') blog.title = item.value;
            if (item.type === 'textarea') blog.content = item.value;
        }

        (async () => {
            try {
                let res1 = await blogsService.insert(blog);
                res1 = await res1.json();
                let id = await res1.id;
                tags.forEach(async (element) => {

                    let blogTag = {};
                    blogTag.blogid = id;
                    blogTag.tagid = element;


                    let res2 = await blogtagsService.insert(blogTag);
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

    handlesEdit(e) {
        let target = e.target;
        if (target.type === 'text') {
            this.setState({
                title: target.value
            });
        } else if (target.type === 'textarea') {
            this.setState({
                content: target.value
            });
        }
    }

    handlesClose(e) {
        e.preventDefault();
        if (!this.props.edit) {
            this.props.history.goBack();
        }

    }



    render() {
        let btn;
        let titleInput;
        let textareaInput;
        if (this.props.edit) {
            // console.log(this.props.blog);
            // console.log(this.state);
            console.log(this.state.title);
            console.log(this.state.content);
            btn = <button type="button" className="close" data-toggle="modal" data-target="#blogModal">
                <span ariaHidden="true" >&times;</span>
            </button>;
            titleInput = <input type="text" className="form-control" id="blog_title" placeholder="Blog Title" value={this.state.title} onChange={this.handlesEdit} />;
            textareaInput = <textarea className="form-control" placeholder="Blog" value={this.state.content} onChange={this.handlesEdit} />;

        } else {
            btn = <button type="button" className="close" onClick={this.handlesClose}>
                <span ariaHidden="true">&times;</span>
            </button>;
            titleInput = <input type="text" className="form-control" id="blog_title" placeholder="Blog Title" />;
            textareaInput = <textarea className="form-control" placeholder="Blog" />;
        }

        return (
            <Fragment>
                {this.state.redirect ? <Redirect to="/" /> : ' '}
                <div className="modal-content my-1">
                    <div className="modal-header">
                        <h5 className="modal-title">Post a blog</h5>
                        <span>{btn}</span>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                {titleInput}
                            </div>
                            <div className="form-group">
                                {textareaInput}

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