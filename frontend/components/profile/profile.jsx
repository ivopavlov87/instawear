import React from 'react';
import ProfileHeader from './profile_header';
import ProfilePosts from './profile_posts';
// import CreatePostFormContainer from '../post_form/create_post_form_container';
// import FollowBarContainer from '../follow-bar/follow_bar_container';
import NavBarContainer from '../nav_bar/nav_bar_container';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: true };
    }

    componentDidMount() {
        this.props.fetchUser(this.props.match.params.id)
            .then(() => this.setState({loading: false}));
    }

    componentDidUpdate(prevProps) {
        if (this.props.user === undefined) {
            this.props.fetchUser(this.props.match.params.id)
                .then(() => this.setState({ loading: false }));
        }
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.fetchUser(this.props.match.params.id)
                .then(() => this.setState({loading: false}));
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.match.params.id !== nextProps.match.params.id) {
    //         this.setState({ loading: true });
    //         this.props.fetchUser(nextProps.match.params.id)
    //             .then(() => this.setState({ loading: false }));
    //         // debugger    
    //         return false;
    //     }
    //     return true;
    // }

    render() {
        const user = this.props.user;
        const posts = this.props.posts;
        const updateUser = this.props.updateUser;

        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="fab fa-instagram" />
                </div>
            );
        } else {
            return ( 
                <div>
                    <NavBarContainer />
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
                </div>
            );
        }
    }
}

export default Profile;