import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUser, fetchUsers, updateUser, updateUserPhoto} from '../../actions/user_actions';
import { selectUserPosts } from '../../reducers/selectors';
// import { selectUserPosts, selectCurrentUserFollowers, selectCurrentUserFollowing } from '../../reducers/selectors';
import { clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => { 
    let user = state.entities.users[ownProps.match.params.id];
    let posts = selectUserPosts(state, ownProps);
    // const followers = selectCurrentUserFollowers(state);
    // const following = selectCurrentUserFollowing(state);

    // debugger

    return ({
        user,
        posts,
        followers: state.entities.followers,
        following: state.entities.following,
        currentUserId: state.session.id,
        errors: state.errors.session
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    // fetchUsers: () => dispatch(fetchUsers()),
    updateUser: user => dispatch(updateUser(user)),
    updateUserPhoto: user => dispatch(updateUserPhoto(user)),
    clearErrors: () => dispatch(clearSessionErrors())
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
