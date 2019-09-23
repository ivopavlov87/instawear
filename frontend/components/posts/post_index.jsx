import React from 'react';
import PostIndexItem from './post_index_item';
import NavBarContainer from '../nav_bar/nav_bar_container';


class PostIndex extends React.Component {
    constructor(props) {
        super(props);
        this.renderPosts = this.renderPosts.bind(this);
    }

    componentDidMount() {
        this.props.fetchAllPosts();
    }

    renderPosts() {
        const posts = Object.values(this.props.posts);

        if (posts.length === 0) {
            return (
                <div className="grid-content no-posts-div">
                    {/* <img src={`${asset_url}('path/to/no_posts.png')`} /> */}
                </div>
            );
        } else {
            const postItems = posts.map((post, idx) => {
                let user = this.props.users[post.user_id]
                return (
                    <figure className="item" key={`feed-figure-${idx}`}>
                        <PostIndexItem
                            key={idx}
                            post={post}
                            user={user}
                        />
                    </figure>
                )
            });

            return (
                <div className="posts">
                    {postItems}
                </div>
            );
        }
    }
    
    render() {
        return (
            <div>
                <NavBarContainer />
                <section className="feed-posts-section">
                    {this.renderPosts()}
                </section>
            </div>    
        );
    }
}

export default PostIndex;