import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUser, fetchUsers, updateUser, updateUserPhoto} from '../../actions/user_actions';
import { selectUserPosts } from '../../reducers/selectors';
import { clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => { 
    let user = state.entities.users[ownProps.match.params.id];
    let posts = selectUserPosts(state, ownProps);

    return ({
        user,
        posts,
        followers: state.entities.followers,
        following: state.entities.following,
        currentUserId: state.session.id,
        currentUser: state.entities.users[state.session.id],
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
