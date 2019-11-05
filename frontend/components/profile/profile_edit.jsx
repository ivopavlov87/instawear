import React from 'react';

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
            email: user.email,
            phoneNumber: user.phone_number || "",
            gender: user.gender || "",
        };

        this.renderErrors = this.renderErrors.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGender = this.handleGender.bind(this);
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
            this.props.closeForm(false);
        });
    }

    handleGender() {

    }

    render() {
        return (
            <div className="profile-edit-container gray-background">
                <div className="profile-edit-main">
                    <header>

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
                        <button onClick={() => this.props.closeForm(false)} className="post-cancel-btn">Cancel</button>
                        <button className="post-submit-btn" onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileEditForm;