import { connect } from 'react-redux';
import Profile from './profile';
import { fetchUser, updateUser} from '../../actions/user_actions';
import { selectUserPosts, selectUser } from '../../reducers/selectors';

const mapStateToProps = (state, ownProps) => { 
    let user = selectUser(state, ownProps);
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
