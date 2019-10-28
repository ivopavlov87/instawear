import React from 'react';
import Typed from 'typed.js';

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDemo = this.handleDemo.bind(this);
        this.animateDemo = this.animateDemo.bind(this);
        this.handleSessionLink = this.handleSessionLink.bind(this);
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    // handleDemo(e) {
    //     e.preventDefault();

    //     let name = {
    //         strings: ["guestuser"],
    //         typeSpeed: 20
    //     };

    //     let username = {
    //         strings: ["guest"],
    //         typeSpeed: 20
    //     };

    //     let email = {
    //         strings: ["guestuser@gmail.com"],
    //         typeSpeed: 20
    //     };

    //     let password = {
    //         strings: ["hunter2"],
    //         typeSpeed: 20
    //     };

    //     this.animateDemo(email, password, name, username);
    // }

    handleDemo(e) {
        e.preventDefault;

        this.props.login({
            name: "guestuser",
            username: "guest",
            email: "guestuser@gmail.com",
            password: "hunter2"
        });
    }

    animateDemo(email, password) {
        this.setState({name: '', username: '', email: '', password: '' }, () => {
            new Typed("#name", name);

            setTimeout(() => {
                new Typed("#username", username);
            }, 500);

            setTimeout(() => {
                new Typed("#email", email);
            }, 500);

            setTimeout(() => {
                new Typed("#password", password);
            }, 500);

            setTimeout(() => {
                this.props.login({
                    name: "guestuser",
                    username: "guest",
                    email: "guestuser@gmail.com",
                    password: "hunter2"
                });
            }, 800);
        });
    }

    renderErrors() {
        if (this.props.errors) {
            return (
                <ul className="errors">
                    {this.props.errors.map((error, i) => (
                        <li key={`error-${i}`}>
                            {error}
                        </li>
                    ))}
                </ul>
            );
        } else {
            return <></>
        }
    }

    handleSessionLink() {
        this.props.clearSessionErrors();
        this.props.history.push(this.props.formType === 'Sign Up' ? '/login' : '/signup');
    }

    render() {
        let nameInput, usernameInput, coolText, sessionLink;
        if (this.props.formType === "Sign In") {
            coolText = "";
            nameInput = <div id="name"></div>
            usernameInput = <div id="username"></div>
            sessionLink = "Sign Up"
        } else {
            coolText = "Sign up to see the latest street style fashion moments";
            sessionLink = "Log In"
            nameInput = (
                <div className='auth-form-input'>
                    <label>
                        <input type="text"
                            value={this.state.name}
                            placeholder='Full Name'
                            id="name"
                            onChange={this.update('name')} />
                    </label>
                </div>
            );

            usernameInput = (
                <div className='auth-form-input'>
                    <label>
                        <input type="text"
                            value={this.state.username}
                            placeholder='Username'
                            id="username"
                            onChange={this.update('username')} />
                    </label>
                </div>
            );
        }
        return (
            <div id="session-form" className="session-form-container">
                <div className="session-form-header">   
                    <form onSubmit={this.handleSubmit} className="auth-form">
                        <h3 className="logo">Instawear</h3>
                        <h4>{coolText}</h4>

                        {nameInput}
                        {usernameInput}

                        <div className="auth-form-input">
                            <label>
                                <input type="text"
                                    value={this.state.email}
                                    onChange={this.update('email')}
                                    id="email"
                                    placeholder="Email"
                                />
                            </label>
                        </div>

                        <div className="auth-form-input">
                            <label>
                                <input type="password"
                                    value={this.state.password}
                                    onChange={this.update('password')}
                                    id="password"
                                    placeholder="Password"
                                />
                            </label>
                        </div>
                        
                        <button>{this.props.formType}</button>
                        {this.renderErrors()}
                    </form>   

                    <div className="divider">
                        or
                    </div>

                    <button
                        onClick={this.handleDemo}
                        className="demo-btn">
                        Try the Demo Account
                    </button>
                </div>

                <div className="session-link">
                    <p>{this.props.navLinkText}</p> 
                    <p onClick={this.handleSessionLink}>{sessionLink}</p>
                </div>

                <div className="get-app-msg">
                    <p>Get the real app.</p>
                </div> 
                <div className="get-real-app">
                    <a href="https://apps.apple.com/us/app/instagram/id389801252">
                        <img src="/images/appstore.png" alt="" />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_US">
                        <img src="/images/googleplay.png" alt="" />
                    </a>
                </div>
            </div>
        );
    }
}

export default SessionForm;
