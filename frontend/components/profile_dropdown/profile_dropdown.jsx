import React from 'react';
import { Link } from 'react-router-dom';
import SettingsContainer from "../settings/settings_container";

class ProfileDropdown extends React.Component { 
    constructor(props) {
        super(props);
        this.state = { show: false }

        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({ show: !this.state.show });
    }

    render() { 
        const currentUser = this.props.currentUser;
        const logout = this.props.logout;
        return (
            <li id="profile-dropdown-btn" 
                onClick={this.toggleShow}
                // onBlur={this.hide}
                >
                <span>
                    <img
                        className="user-avatar"
                        src={currentUser.profilePhoto}
                        alt={currentUser.username}
                        title={currentUser.username}
                    />
                </span>
                {
                    this.state.show &&
                (
                    <ul id="profile-dropdown" className="profile-dropdown ">
                        <li>
                            <Link
                                to={`/profile/${currentUser.id}`}
                                className="profile-name">@{currentUser.username}
                            </Link> 
                        </li>
                        <li>
                            <Link to="/friends">Find Friends</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                        <li>
                            <a id="logout" onClick={logout}>Log Out</a>
                        </li>
                    </ul>
                )
                }
            </li>
        )
    }
};

export default ProfileDropdown;