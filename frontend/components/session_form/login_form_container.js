import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { login, clearSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Sign In',
        // navLink: <Link to="/signup">Sign Up</Link>,
        navLinkText: "Don't have an account?"
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: user => dispatch(login(user)),
        login: user => dispatch(login(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
