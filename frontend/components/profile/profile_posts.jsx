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
                    <img className="no-post-img" src="/images/camera.png"/>
                    <h3 className="no-post-h3">Share Photos</h3>
                    <p className="no-post-p">When you share photos, they'll appear on your profile.</p>

                </div>
            );
        } else {
            const postItems = posts.map((post, idx) => {
                return (
                    <ProfilePostItem
                        key={idx}
                        post={post}
                        user={user} 
                    />
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