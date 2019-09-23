import React from 'react';
// import { Provider } from 'react-redux';
import {
    // Route,
    // Redirect,
    Switch,
    // Link,
    // HashRouter
} from 'react-router-dom';

import SignUpFormContainer from './session_form/signup_form_container';
import LogInFormContainer from './session_form/login_form_container';

// import Logo from './logo/logo';
// import Sidebar from './sidebar/sidebar';

import ProfileContainer from './profile/profile_container';
// import CreatePostFormContainer from './post_form/create_post_form_container';
import PostShowContainer from './posts/post_show_container';
import PostIndexContainer from './posts/post_index_container';

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
    <div>
        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
        <AuthRoute exact path="/login" component={LogInFormContainer} />
        {/* <AuthRoute path='/' component={Splash} /> */}
        
        <Switch>
            <ProtectedRoute path='/user/:id' component={ProfileContainer} />
            <ProtectedRoute path='/posts/:id' component={PostShowContainer} />
            <ProtectedRoute path='/feed' component={PostIndexContainer} />
        </Switch>
    </div>
);

export default App;
