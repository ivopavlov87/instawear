import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUser, updateUser, updateUserPhoto} from '../../actions/user_actions';
import { selectUserPosts } from '../../reducers/selectors';
import { clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => { 
    let user = state.entities.users[ownProps.match.params.id];
    let posts = selectUserPosts(state, ownProps);

    return ({
        user,
        posts,
        currentUserId: state.session.id,
        errors: state.errors.session
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    updateUser: user => dispatch(updateUser(user)),
    updateUserPhoto: user => dispatch(updateUserPhoto(user)),
    clearErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
