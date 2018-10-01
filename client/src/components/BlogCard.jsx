import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
class BlogCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            blog: {},
            tags: []
        }
    }


    async componentDidMount() {
        let path = this.props.match.url;
        if (path.includes('blogs')) {
            let id = this.props.match.params.id;
            let index = path.indexOf('entry') - 1;
            let url1 = `http://localhost:3000/api/${path.slice(0, index)}`;
            let url2 = `http://localhost:3000/api/blogs/blogtags/${id}`;
            try {
                let [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);
                let [data1, data2] = await Promise.all([res1.json(), res2.json()]);
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


    }


    render() {
        let blog = this.state.blog;
        let tabTitle = this.props.match.url.split("/").slice(-1);
        let label;
        let tags = this.state.tags.map((tag, index) => {
            if(this.state.tags.length !== 0){
                return (
            <label className={`badgeMod badge-info `} key={tag['_created'] + index}>{tag.name}</label>);
             }else{
                 return;
             }
        });
        return (
            <Fragment>
                <Navbar tab={tabTitle} path={this.props.match.url} />
                <div className="card my-1 ">
                    <div className="card-header text-center" >{blog.title}</div>
                    <div className="card-body">
                        <span className="text-right  text-muted d-block">{blog.date ? blog.date.toLocaleDateString() : ''}</span>
                        {blog.content}
                    </div>
                    <div className="card-footer form-inline justify-content-around">
                    {tags.length !== 0? <span className="d-block col-12"> Tags:</span>: ''}
                        {tags}
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default BlogCard;