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
                <div className="no-posts-div">
                    {/* <img src={`${asset_url}('path/to/no_posts.png')`} /> */}
                </div>
            );
        } else {
            const postItems = posts.map((post, idx) => {
                return (
                    // <figure className="profile-post-item" key={`figure-${idx}`}>
                        <ProfilePostItem
                            key={idx}
                            post={post}
                            user={user} 
                        />
                    // </figure>
                ) 
            });
            return (
                <div className="profile-posts">
                    {postItems}
                </div>
            );
        }
    }

    render() {
        return (
            <section className="profile-posts-section">
                <div className="profile-posts-icon">
                    <div className="posts-highlight">
                        <img src="/images/layout.png" alt="" className="posts-layout-icon" />
                        <p>POSTS</p>
                    </div>   
                </div>
                {this.renderPosts()}
            </section>   
        );
    }
}

export default ProfilePosts;