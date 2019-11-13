import React from 'react';
import { Link } from 'react-router-dom';
import FollowBarContainer from '../follow-bar/follow_bar_container';
import ProfileEditForm from './profile_edit';
// import FollowItem from "./follow_item_container";
import ProfileFollowers from "./profile_followers_container";
import ProfileFollowing from "./profile_following_container";


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
            renderFollowers: false,
            renderFollowing: false
        };

        this.handleAvatar = this.handleAvatar.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        // this.renderEditForm = this.renderEditForm.bind(this);
        // this.changeEditing = this.changeEditing.bind(this);
        this.renderFollowers = this.renderFollowers.bind(this);
        this.renderFollowing = this.renderFollowing.bind(this);
        this.showFollowers = this.showFollowers.bind(this);
        this.showFollowing = this.showFollowing.bind(this);
    }

    handleAvatar(e) {
        this.setState({ photoFile: e.currentTarget.files[0] }, () => {
            let loading = document.createElement('img');
            loading.src = "/images/avatar-loading.gif";
            loading.id = "avatar-loading-id"
            let ava = document.getElementById("user-photo-id");
            ava.appendChild(loading);
            
            const formData = new FormData();

            if (this.state.photoFile) {
                formData.append('user[profile_photo]', this.state.photoFile);
            }
            this.props.updateUserPhoto({
                formData,
                id: this.props.user.id
            }).then(() => {
                let loadingBtn = document.getElementById("avatar-loading-id");
                let avatarBtn = document.getElementById("user-photo-id");
                avatarBtn.removeChild(loadingBtn);
            });
        });
    }

    renderFollowers() {
        let followers = Object.values(this.props.followers);
        // debugger
        return (
            this.state.renderFollowers === false ? <></> : (
                followers.length === 0 ? (
                    <div className="profile-follows followers">
                        <div className="follows-header">
                            <p className="follows-title">Followers</p >
                            <div className="close" onClick={() => this.showFollowers(false)}></div>
                        </div>
                        <div className="follows-list">
                            <div className="no-follows-item">
                                <img src="/images/add-follow.png"/>
                                <h3>People who follow you</h3>
                                <p>Once people follow you, you'll see them here.</p>
                            </div>
                        </div>
                        <div className="screen"
                            onClick={() => this.showFollowers(false)}>
                        </div>
                    </div>
                ) : (
                    // <div className = "profile-follows followers">
                    //     <div className = "follows-header">
                    //         <p className = "follows-title">Followers</p >
                    //         <div className="close" onClick={() => this.showFollowers(false)}></div>
                    //     </div>
                    //     <div className="follows-list">
                    //         {followers.map((follower, idx) => {
                    //             return <FollowItem
                    //                 user={follower}
                    //                 key={`user-follower-${idx}`}
                    //                 closeForm={this.showFollowers}
                    //             />
                    //         })}
                    //     </div>
                    //     <div className="screen"
                    //         onClick={() => this.showFollowers(false)}>
                    //     </div>
                    // </div >
                        <ProfileFollowers followers={followers} showFollowers={this.showFollowers}/>
                )   
            )
        );
    }

    renderFollowing() {
        let following = Object.values(this.props.following);
        return (
            this.state.renderFollowing === false ? <></> : (
                following.length === 0 ? (
                    <div className="profile-follows following">
                        <div className="follows-header">
                            <p className="follows-title">Following</p >
                            <div className="close" onClick={() => this.showFollowing(false)}></div>
                        </div >
                        <div className="follows-list">
                            <div className="no-follows-item">
                                <img src="/images/add-follow.png" />
                                <h3>People you follow</h3>
                                <p>Once you follow people, you'll see them here.</p>
                            </div>
                        </div>
                        <div className="screen"
                            onClick={() => this.showFollowing(false)}>
                        </div>
                    </div>
                ) : (
                    // <div className="profile-follows following">
                    //     <div className="follows-header">
                    //         <p className="follows-title">Following</p>
                    //         <div className="close" onClick={() => this.showFollowing(false)}></div>
                    //     </div>
                    //     <div className="follows-list">
                    //         {following.map((fwing, idx) => {
                    //             return <FollowItem
                    //                 user={fwing}
                    //                 key={`user-following-${idx}`}
                    //                 closeForm={this.showFollowing}
                    //             />
                    //         })}
                    //     </div>
                    //     <div className="screen"
                    //         onClick={() => this.showFollowing(false)}>
                    //     </div>
                    // </div>
                        <ProfileFollowing following={following} showFollowing={this.showFollowing} />
                )
            )
        );
    }

    showFollowers(bool) {
        this.setState({
            renderFollowers: bool
        });
    }

    showFollowing(bool) {
        this.setState({
            renderFollowing: bool
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
                            onChange={(e) => {
                                this.handleAvatar(e);
                            }}
                        />
                    </label>
                    <div id="user-photo-id">
                        <img id="profile-avatar-id" src={this.props.user.profilePhoto} className="profile-avatar" />
                    </div>
                </div>
            );
        } else {
            return <div className="user-photo" id="user-photo-id">
                <img src={this.props.user.profilePhoto} className="profile-avatar" />
            </div>
        }
    }

    // renderEditForm() {
    //     // return <ProfileEditForm
    //     //     user={this.props.user}
    //     //     updateUser={this.props.updateUser}
    //     //     updateUserPhoto={this.props.updateUserPhoto}
    //     //     closeForm={this.changeEditing}
    //     //     errors={this.props.errors}
    //     //     clearErrors={this.props.clearErrors}
    //     // />
    //     return this.state.editing === false ? (<></>) : (
    //         <ProfileEditForm
    //             user={this.props.user}
    //             currentUser={this.props.currentUser}
    //             updateUser={this.props.updateUser}
    //             closeForm={this.changeEditing}
    //             errors={this.props.errors}
    //             clearErrors={this.props.clearErrors}
    //             updateUserPhoto={this.props.updateUserPhoto}
    //         />
    //     );
    // }

    // changeEditing(bool) {
    //     this.setState({
    //         editing: bool
    //     });
    // }

    render() {
        let { user } = this.props; 
        if (user === undefined) return <div></div>
        // debugger
        let followBtn = user.id !== this.props.currentUserId ? (<div>
                <FollowBarContainer user={user} />
            </div>
            ) : (<div id="fake-follow">
                {/* <FollowBarContainer user={user} /> */}
            </div>);

        let editProfileBtn = user.id === this.props.currentUserId ? (
        <div>
            <Link to={`/user/${this.props.user.id}/edit`}>
                <button 
                    // onClick={() => { this.changeEditing(true) }} 
                    className="profile-header-btn edit-profile-btn">
                    Edit Profile
                </button>
            </Link>
        </div>) : <></>;

        let followerCount = user.followerCount === 0 ? <p className="show-follows" onClick={() => { this.showFollowers(true)}}><strong>{user.followerCount}</strong> follower</p> :
            <p className="show-follows"  onClick={() => { this.showFollowers(true)}}><strong>{user.followerCount}</strong> followers</p>

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
                        <p className="show-follows" onClick={() => { this.showFollowing(true) }}><strong>{user.followingCount}</strong> following</p>
                    </div>
                    <div className="profile-bio user-main-div">
                        <p><strong>{user.name}</strong></p>
                        <p>{user.bio}</p>
                        <p><a href={`https://${user.website}`}><strong>{user.website}</strong></a></p>
                    </div>
                </div>
                {/* {this.renderEditForm()} */}
                {/* {this.renderFollowers()}
                {this.renderFollowing()} */}
            </header>
        );
    }
}

export default ProfileHeader;