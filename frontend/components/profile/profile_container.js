import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUser, updateUser} from '../../actions/user_actions';
import { selectUserPosts } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => { 
    let user = state.entities.users[ownProps.match.params.id];
    let posts = selectUserPosts(state, ownProps);

    return ({
        user,
        posts,
        currentUserId: state.session.id,
    });
};

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    updateUser: user => dispatch(updateUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
