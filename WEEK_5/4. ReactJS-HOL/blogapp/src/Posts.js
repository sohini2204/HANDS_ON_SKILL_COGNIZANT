import React from 'react';
import Post from './Post';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [
                new Post(1, 'Loading Posts...', 'Please wait while the blog posts are being loaded from the server.')
            ]
        };
    }

    loadPosts() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                const posts = data.map(post => new Post(post.id, post.title, post.body));
                this.setState({ posts: posts });
            })
            .catch(error => {
                console.log('Error fetching posts:', error);
            });
    }

    componentDidMount() {
        this.loadPosts();
    }

    componentDidCatch(error, info) {
        alert('An error occurred: ' + error.message);
        console.log('Error info:', info);
    }

    render() {
        return (
            <div className="posts-container">
                <h1>Blog Posts</h1>
                {this.state.posts.map(post => (
                    <div className="post" key={post.id}>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-body">{post.body}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Posts;

