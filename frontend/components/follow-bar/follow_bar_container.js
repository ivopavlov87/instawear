import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FollowBar from './follow_bar';
import { fetchUser, fetchUsers } from '../../actions/user_actions';

import {
    createFollow,
    deleteFollow
} from '../../actions/follow_actions';

const mapStateToProps = (state, ownProps) => { 
    let users = state.entities.users;
    return {
        followedByCurrentUser: ownProps.user === undefined ? undefined : users[ownProps.user.id].followedByCurrentUser,
        currentUserId: state.session.id,
    }
};


const mapDistpatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    fetchUsers: () => dispatch(fetchUsers()),
    createFollow: (following_id) => dispatch(createFollow(following_id)),
    deleteFollow: (following_id) => dispatch(deleteFollow(following_id)),
});

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(FollowBar));