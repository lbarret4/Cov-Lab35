import React, { Component, Fragment } from 'react';
import Navbar from './Navbar';
import Card from './Card';
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
            <label className={`badgeMod badge-info mx-2 my-1`} key={tag['_created'] + index}>{tag.name}</label>);
             }else{
                 return;
             }
        });
        let header = blog.title;
        let body= (<Fragment>  
             <span className="text-right  text-muted d-block">
             {blog.date ? blog.date.toLocaleDateString() : ''}</span>
        {blog.content}
        </Fragment>);
        let footer=( tags.length !== 0 ? <Fragment><span className="d-block col-12"> Tags:</span> <span className="ml-2 form-inline">{tags}</span></Fragment> : '');
                
        return (
            <Fragment>
                <Navbar tab={tabTitle} path={this.props.match.url} />
               < Card header= {header} body={body} footer={footer} />
            </Fragment>
        );
    }
}

export default BlogCard;