import React from 'react';
import { Link } from 'react-router-dom';
import ProfileTabs from './profile_tabs';
import FollowBarContainer from '../follow-bar/follow_bar_container';

class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        const user = this.props.user;

        this.state = {
            id: user.id,
            username: user.username,
            email: user.email,
            profilePhoto: user.profilePhoto,
            coverPhoto: user.coverPhoto,
            photoFile: null,
        };

        this.handleAvatar = this.handleAvatar.bind(this);
        this.handleCover = this.handleCover.bind(this);
        this.updateCover = this.updateCover.bind(this);
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
                id: this.state.id
            });
        });
    }

    handleCover(e) {
        this.setState({ photoFile: e.currentTarget.files[0] }, () => {
            const formData = new FormData();

            if (this.state.photoFile) {
                formData.append('user[cover_photo]', this.state.photoFile);
            }
            this.props.updateUser({
                formData,
                id: this.state.id
            });
        });
    }

    updateCover() {
        let { currentUserId, user } = this.props;
        if (currentUserId === user.id) {
            return (
                <div className="edit-single-image-cover">
                    <div className="edit-cover-div">
                        <input
                            id="setting-upload-cover"
                            className="upload-cover"
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            onChange={this.handleCover}
                        />
                        <label htmlFor="setting-upload-cover" className="edit-cover">
                            <i className="camera-icon"></i>
                            <span>Edit Cover</span>
                        </label>
                    </div>
                </div>
            );
        }
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
                        <img src={this.props.user.profilePhoto} className="profile_avatar" />
                    </label>
                </div>
            );
        } else {
            return <div className="user-photo">
                <img src={this.props.user.profilePhoto} className="profile_avatar" />
            </div>
        }
    }

    render() {
        return (
            <div>
                <section className="grid-content profile-cover-section">
                    <div className="single-cover-image" 
                        style={{backgroundImage: `url(${this.props.user.coverPhoto})`}}>

                        {this.updateCover()}
                    </div>
                </section>

                <section className="profile-header-section">
                    <div className="grid-content user-info-top">
                        <form className="user-description">
                            <div className="content clearfix">
                                <div className="user-photo-div">
                                    {this.updateAvatar()}
                                </div>
                                <div className="user-info">
                                    <div className="top-block">
                                        <h1 className="user-name">
                                            <span className="user-info-span">
                                                @{this.state.username}
                                            </span>
                                        </h1>
                                        <div className="follow">
                                            <FollowBarContainer user={this.props.user}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="profile-menu">
                            <ProfileTabs user={this.props.user} />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ProfileHeader;