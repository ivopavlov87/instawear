import React from 'react';
import { Link } from 'react-router-dom';
import ProfileTabs from './profile_tabs';
import FollowBarContainer from '../follow-bar/follow_bar_container';

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        const user = this.props.user;

        this.state = {
            // id: user.id,
            // username: user.username,
            // email: user.email,
            // name: user.name,
            // bio: user.bio,
            // gender: user.gender,
            // website: user.website,
            // phone_number: user.phone_number,
            // profilePhoto: user.profilePhoto,
            photoFile: null,
        };

        this.handleAvatar = this.handleAvatar.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
    }

    handleAvatar(e) {
        this.setState({ photoFile: e.currentTarget.files[0] }, () => {
            const formData = new FormData();

            if (this.state.photoFile) {
                formData.append('user[profile_photo]', this.state.photoFile);
            }
            this.props.updateUser({
                formData,
                id: this.props.user.id
            });
        });
    }

    updateAvatar() {
        let { currentUserId, user } = this.props;
        if (currentUserId === user.id) {
            return (
                <div className="user-photo">
                    <input
                        id="setting-upload-avatar"
                        className="upload-avatar"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={this.handleAvatar}
                    />
                    <label htmlFor="setting-upload-avatar">
                        <img src={this.props.user.profilePhoto} className="profile-avatar" />
                    </label>
                </div>
            );
        } else {
            return <div className="user-photo">
                <img src={this.props.user.profilePhoto} className="profile-avatar" />
            </div>
        }
    }

    render() {
        let { user } = this.props; 
        let followBtn = user.id !== this.props.currentUserId ? (<div>
            {/* <FollowBarContainer user={this.props.user} /> */}
            <button className="profile-header-btn follow-btn">Follow</button>
            </div>) : <></>;

        let editProfileBtn = user.id === this.props.currentUserId ? (<div>
                <button className="profile-header-btn edit-profile-btn">Edit Profile</button>
            </div>) : <></>;

        return (
            <header className="profile-header-section">
                <div className="user-avatar">
                    {this.updateAvatar()}
                </div>
                <div className="user-main">
                    <div className="user-info">
                        <h2 className="profile-username">
                            {user.username}
                        </h2>
                        {followBtn}
                        {editProfileBtn}
                    </div>
                    <div className="profile-menu">
                        <p><strong>{user.postIds.length}</strong> posts</p>
                    </div>
                    <div className="profile-bio">
                        <p><strong>{user.name}</strong></p>
                        <p>{user.bio}</p>
                        <a>{user.website}</a>
                    </div>
                </div>
                {/* <div className="profile-menu">
                    <ProfileTabs user={this.props.user} />
                </div> */}
            </header>
        );
    }
}

export default ProfileHeader;