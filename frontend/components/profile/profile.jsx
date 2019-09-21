import React from 'react';
import ProfileHeader from './profile_header';
import ProfilePosts from './profile_posts';
// import CreatePostFormContainer from '../post_form/create_post_form_container';
// import FollowBarContainer from '../follow-bar/follow_bar_container';


class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.user === undefined) {
            this.props.fetchUser(this.props.match.params.id);
        }
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchUser(this.props.match.params.id);
        }
    }

    // shouldComponentUpdate(nextProps) {
    //     if (this.props.match.params.id !== nextProps.match.params.id) {
    //         this.props.fetchUser(nextProps.match.params.id)
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        const user = this.props.user;
        const posts = this.props.posts;
        const updateUser = this.props.updateUser;
        if (!user) {
            return <div>Loading.....</div>
        } else {
            return (
                <div className="profile-container">
                    <ProfileHeader 
                        user={user} 
                        updateUser={updateUser} 
                        fetchUser={this.props.fetchUser} 
                        currentUserId={this.props.currentUserId}
                    />
                    {/* <FollowBarContainer /> */}
                    <ProfilePosts user={user} posts={posts} />
                </div>
            );
        }
    }
}

export default Profile;