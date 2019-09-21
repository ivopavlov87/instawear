import React from 'react';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

const Logo = () => (
    <nav className="left-nav">
        <ul>
            <li>
                <Link to="/" className="logo-link">
                    <img src="images/logo.png" className="logo"/>
                </Link>
            </li>
        </ul>
    </nav>
)

export default Logo;