import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FollowBar from './follow_bar';
// import { selectUserFollowers } from '../../reducers/selectors';
import { fetchUser, fetchUsers } from '../../actions/user_actions';

import {
    createFollow,
    deleteFollow
} from '../../actions/follow_actions';

const mapStateToProps = (state, ownProps) => { 
    let users = state.entities.users;
    // debugger
    return {
        // followers: selectUserFollowers(state, ownProps),
        followedByCurrentUser: ownProps.user === undefined ? undefined : users[ownProps.user.id].followedByCurrentUser,
        // followedByCurrentUser: ownProps.user === undefined ? undefined : ownProps.user.followedByCurrentUser,
        // followedByCurrentUser: ownProps.user.followedByCurrentUser,
        // selectUserFollowers(state, ownProps).includes(state.session.id), // indicates wheather or not the current user follows the user comming from the wield card
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