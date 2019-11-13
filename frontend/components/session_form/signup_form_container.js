import { connect } from 'react-redux';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signup, login, clearSessionErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = ({ errors }) => {
    return {
        errors: errors.session,
        formType: 'Sign Up',
        navLinkText: "Already have an account?"
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        login: user => dispatch(login(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionForm));
