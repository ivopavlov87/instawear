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
        };

        this.renderErrors = this.renderErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            this.goToPreviousURL();
        });
    }

    goToPreviousURL() {
        this.props.history.goBack();
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
                            {this.renderErrors()}
                        </div>
                        <div className="post-btns">
                            <button 
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

