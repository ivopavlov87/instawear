import React from 'react';
import ProfilePostItem from './profile_post_item';

class ProfilePosts extends React.Component {
    constructor(props) {
        super(props);
        this.renderPosts = this.renderPosts.bind(this);
    }

    renderPosts() {
        const posts = this.props.posts;
        const user = this.props.user;

        if (!posts) {
            return <div></div>
        }

        if (posts.length === 0) {
            return (
                <div className="grid-content no-posts-div">
                    {/* <img src={`${asset_url}('path/to/no_posts.png')`} /> */}
                </div>
            );
        } else {
            const postItems = posts.map((post, idx) => {
                return (
                    <figure className="item" key={`figure-${idx}`}>
                        <ProfilePostItem
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
            <section className="grid-content posts-section">
                {this.renderPosts()}
            </section>

            
        );
    }
}

export default ProfilePosts;