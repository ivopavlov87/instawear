import React from 'react';
// import { Link } from 'react-router-dom';
import FollowBarContainer from '../follow-bar/follow_bar_container';
import ProfileEditForm from './profile_edit';


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
            editing: false,
        };

        this.handleAvatar = this.handleAvatar.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.renderEditForm = this.renderEditForm.bind(this);
        this.changeEditing = this.changeEditing.bind(this);
    }

    handleAvatar(e) {
        this.setState({ photoFile: e.currentTarget.files[0] }, () => {
            const formData = new FormData();

            if (this.state.photoFile) {
                formData.append('user[profile_photo]', this.state.photoFile);
            }
            this.props.updateUserPhoto({
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
                    <label htmlFor="setting-upload-avatar" id="avatar-upload-label">
                        <img src="/images/plus.png" alt="" id="avatar-upload-icon"/>
                        <input
                            id="setting-upload-avatar"
                            className="upload-avatar"
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            onChange={this.handleAvatar}
                        />
                    </label>
                    <img src={this.props.user.profilePhoto} className="profile-avatar" />
                </div>
            );
        } else {
            return <div className="user-photo">
                <img src={this.props.user.profilePhoto} className="profile-avatar" />
            </div>
        }
    }

    renderEditForm() {
        // return <ProfileEditForm
        //     user={this.props.user}
        //     updateUser={this.props.updateUser}
        //     updateUserPhoto={this.props.updateUserPhoto}
        //     closeForm={this.changeEditing}
        //     errors={this.props.errors}
        //     clearErrors={this.props.clearErrors}
        // />
        return this.state.editing === false ? (<></>) : (
            <ProfileEditForm
                user={this.props.user}
                updateUser={this.props.updateUser}
                closeForm={this.changeEditing}
                errors={this.props.errors}
                clearErrors={this.props.clearErrors}
            />
        );
    }

    changeEditing(bool) {
        this.setState({
            editing: bool
        });
    }

    render() {
        let { user } = this.props; 
        if (!user) return <div></div>
        // debugger
        let followBtn = user.id !== this.props.currentUserId ? (<div>
            {/* <FollowBarContainer user={this.props.user} /> */}
            {/* <button className="profile-header-btn follow-btn">Follow</button> */}
            {/* <FollowBarContainer user={user} followedByCurrentUser={user.followedByCurrentUser}/> */}
            <FollowBarContainer user={user} userId={user.id} />
            </div>) : <></>;

        let editProfileBtn = user.id === this.props.currentUserId ? (<div>
                <button onClick={() => { this.changeEditing(true) }} 
                    className="profile-header-btn edit-profile-btn">
                    Edit Profile
                </button>
                {/* pass the user and updateUser and errors*/}
            </div>) : <></>;

        let followerCount = user.followerCount === 0 ? <p><strong>{user.followerCount}</strong> follower</p> :
            <p><strong>{user.followerCount}</strong> followers</p>

        return (
            <header className="profile-header-section">
                <div className="user-avatar">
                    {this.updateAvatar()}
                </div>
                <div className="user-main">
                    <div className="user-info user-main-div">
                        <h2 className="profile-username">
                            {user.username}
                        </h2>
                        {followBtn}
                        {editProfileBtn}
                    </div>
                    <div className="profile-menu user-main-div">
                        <p><strong>{user.postIds.length}</strong> posts</p>
                        {followerCount}
                        <p><strong>{user.followingCount}</strong> following</p>
                    </div>
                    <div className="profile-bio user-main-div">
                        <p><strong>{user.name}</strong></p>
                        <p>{user.bio}</p>
                        <p><a href={`https://${user.website}`}><strong>{user.website}</strong></a></p>
                    </div>
                </div>
                {/* <div className="profile-menu">
                    <ProfileTabs user={this.props.user} />
                </div> */}
                {this.renderEditForm()}
            </header>
        );
    }
}

export default ProfileHeader;