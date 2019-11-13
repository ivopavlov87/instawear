import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBarContainer from "../nav_bar/nav_bar_container";
import { updateUser, updateUserPhoto } from '../../actions/user_actions';
import { clearSessionErrors } from '../../actions/session_actions';

class ProfileEditForm extends React.Component {
    constructor(props) {
        super(props);
        const user = this.props.user;
        this.state = {
            id: user.id,
            name: user.name || "",
            username: user.username,
            website: user.website || "",
            bio: user.bio || "",
            // email: user.email,
            // phoneNumber: user.phone_number || "",
            // gender: user.gender || "",
        };

        this.renderErrors = this.renderErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleGender = this.handleGender.bind(this);
        this.handleDeleteAvatar = this.handleDeleteAvatar.bind(this);
        this.goToPreviousURL = this.goToPreviousURL.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => this.setState({ [field]: e.target.value });
    }

    renderErrors() {
        if (this.props.errors) {
            return (
                <ul className="errors">
                    {this.props.errors.map((error, i) => (
                        <li key={`profile-edit-error-${i}`}>
                            {error}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <></>
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateUser(this.state).then(() => {
            // this.props.closeForm(false);
            this.goToPreviousURL();
        });
    }

    // handleGender() {

    // }

    handleDeleteAvatar(e) {
        debugger
        e.preventDefault();

        let loading = document.createElement('img');
        loading.src = "/images/avatar-loading.gif";
        loading.id = "delete-avatar-loading-id";
        let ava = document.getElementById("delete-user-photo-id");
        ava.appendChild(loading);

        const formData = new FormData();
        // let file = open("s3://active-storage-insta-dev/zwywstDHuQC597maH9YwGnLo");
        let file = open("https://active-storage-insta-dev.s3-us-west-1.amazonaws.com/profile-default.jpg");
        // this.props.user.profile_photo.attach(io: file, filename: "zwywstDHuQC597maH9YwGnLo");

        formData.append('user[profile_photo]', file);

        debugger
        this.props.updateUserPhoto({
            formData,
            id: this.props.user.id
        }).then(() => {
            let loadingBtn = document.getElementById("delete-avatar-loading-id");
            let avatarBtn = document.getElementById("delete-user-photo-id");
            avatarBtn.removeChild(loadingBtn);
        });
    }

    goToPreviousURL() {
        this.props.history.goBack();
        // this.props.history.push(this.props.url);
    }

    render() {
        return (
            <div>
                <NavBarContainer />
                <div className="profile-edit-container gray-background">
                    <div className="profile-edit-main">
                        <header className="profile-edit-header">
                            <div id="delete-user-photo-id">
                                <img className="profile-edit-avatar" src={this.props.currentUser.profilePhoto} alt=""/>
                            </div>
                            <div className="profile-edit-user">
                                <p className="profile-edit-username">{this.props.currentUser.username}</p>
                                {/* <p className="delete-avatar" onClick={this.handleDeleteAvatar}>Delete Profile Photo</p> */}
                            </div>
                        </header>

                        <div className="profile-edit-form">
                            <div className="profile-edit-field">
                                <aside>
                                    <label>Name</label>
                                </aside>
                                <div>
                                    <input className=""
                                        type="text"
                                        value={this.state.name}
                                        onChange={this.update("name")}
                                    />
                                </div> 
                            </div>
                            <div className="profile-edit-field">
                                <aside>
                                    <label>Username</label>
                                </aside>
                                <div>
                                    <input className=""
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.update("username")}
                                    />
                                </div>
                            </div>
                            <div className="profile-edit-field">
                                <aside>
                                    <label>Website</label>
                                </aside>
                                <div>
                                    <input className=""
                                        type="text"
                                        value={this.state.website}
                                        onChange={this.update("website")}
                                    />
                                </div>
                            </div>
                            <div className="profile-edit-field">
                                <aside>
                                    <label>Bio</label>
                                </aside>
                                <div>
                                    <textarea className=""
                                        value={this.state.bio}
                                        onChange={this.update("bio")}
                                    />
                                </div>
                            </div>
                            
                            {/* <div className="profile-edit-field">
                                <p>Private Information</p>
                            </div> */}
                            {/* <div>
                                <label>
                                Email
                                <input className=""
                                        type="text"
                                        value={this.state.email}
                                        onChange={this.update("email")}
                                    />
                                </label>
                            </div> */}
                            {/* <div className="profile-edit-field">
                                <aside>
                                    <label>Phone Number</label>
                                </aside>
                                <div>
                                    <input className=""
                                        type="text"
                                        value={this.state.phoneNumber}
                                        onChange={this.update("phoneNumber")}
                                    />
                                </div>
                            </div> */}
                            {/* <div className="profile-edit-field">
                                <aside>
                                    <label>Gender</label>
                                </aside>
                                <div onClick={this.handleGender}>{this.state.gender}</div>
                            </div> */}
                            
                            {this.renderErrors()}
                        </div>
                        <div className="post-btns">
                            <button 
                                // onClick={() => this.props.closeForm(false)} 
                                onClick={this.goToPreviousURL}
                                className="post-cancel-btn">Cancel
                            </button>
                            <button className="post-submit-btn" onClick={this.handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let user = state.entities.users[ownProps.match.params.id];

    return ({
        user,
        currentUserId: state.session.id,
        currentUser: state.entities.users[state.session.id],
        errors: state.errors.session
    });
};

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(updateUser(user)),
    updateUserPhoto: user => dispatch(updateUserPhoto(user)),
    clearErrors: () => dispatch(clearSessionErrors())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileEditForm));

