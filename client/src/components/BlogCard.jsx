import React, { Component, Fragment } from 'react';
import Card from './Card';
import * as blogsService from '../services/blogs';
import * as blogtagsService from '../services/blogtags';
import BlogEdit from './BlogEdit';
import { isLoggedIn } from '../services/user';
class BlogCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {},
            tags: []
        };
    }


    async componentDidMount() {
        let id = this.props.match.params.id;
        try {
            let [data1, data2] = await Promise.all([blogsService.one(id), blogtagsService.one(id)]);
            data1.date = new Date(await data1['_created']);
            delete data1["_created"];
            this.setState({
                blog: await data1,
                tags: await data2
            });
        } catch (error) {
            console.log(error);
        }



    }


    render() {
        let blog = this.state.blog;
        let editBtn = <button type="button" class="btn btn-outline-primary" data-toggle="modal" data-target="#blogModal">Edit</button>;
        let tags = this.state.tags.map((tag, index) => {
            if (this.state.tags.length !== 0) {
                return (
                    <label className={`badgeMod badge-info mx-2 my-1`} key={tag['_created'] + index}>{tag.name}</label>);
            } else {
                return;
            }
        });
        let header = (
            <div className='row'>
            <div className='col'></div>
            <div className='col'> {blog.title}</div>
            <div className='col d-flex justify-content-end'>{isLoggedIn()? editBtn:''}</div>          
            </div>);
        let body = (<Fragment>
            <span className="text-right  text-muted d-block">
                {blog.date ? blog.date.toLocaleDateString() : ''}</span>
            {blog.content}
        </Fragment>);
        let footer = (tags.length !== 0 ? <Fragment><span className="d-block col-12"> Tags:</span> <span className="ml-2 form-inline">{tags}</span></Fragment> : '');

        return (
            <Fragment>
                < Card header={header} body={body} footer={footer} />
                <div class="modal fade" id="blogModal" tabindex="-1" role="dialog" aria-labelledby="chirpsModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <BlogEdit edit={true} blog={blog} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default BlogCard;