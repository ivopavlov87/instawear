import React from 'react';
import ProfileHeader from './profile_header';
import ProfilePosts from './profile_posts';
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

    render() {
        const user = this.props.user;
        const posts = this.props.posts;
        const updateUser = this.props.updateUser;
        const updateUserPhoto = this.props.updateUserPhoto;

        if (this.state.loading === true) {
            return (
                <div className="loading">
                    <i className="fab fa-instagram" />
                </div>
            );
        } else {
            return ( 
                <div className="profile-main">
                    <NavBarContainer />
                    <div className="profile-container">
                        <ProfileHeader
                            user={user}
                            updateUser={updateUser}
                            updateUserPhoto={updateUserPhoto}
                            fetchUser={this.props.fetchUser}
                            currentUserId={this.props.currentUserId}
                            currentUser={this.props.currentUser}
                            errors={this.props.errors}
                            clearErrors={this.props.clearErrors}
                            followers={this.props.followers}
                            following={this.props.following}
                        />
                        <ProfilePosts user={user} posts={posts} />
                    </div>
                    <footer className="about-links">
                        <a href="https://anoushsaroyan.com">ABOUT ME</a>
                        <a href="https://github.com/AnoushSaroyan">GITHUB</a>
                        <a href="https://www.linkedin.com/in/anoushsaroyan/">LINKEDIN</a>
                    </footer> 
                </div>
            );
        }
    }
}

export default Profile;