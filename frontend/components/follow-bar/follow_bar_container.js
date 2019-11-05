import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FollowBar from './follow_bar';
// import { selectUserFollowers } from '../../reducers/selectors';
import { fetchUser } from '../../actions/user_actions';

import {
    createFollow,
    deleteFollow
} from '../../actions/follow_actions';


const mapStateToProps = (state, ownProps) => ({
    // followers: selectUserFollowers(state, ownProps),
    // followedByCurrentUser: selectUserFollowers(state, ownProps).includes(state.session.id), // indicates wheather or not the current user follows the user comming from the wield card
    currentUserId: state.session.id,
});


const mapDistpatchToProps = dispatch => ({
    // fetchUser: id => dispatch(fetchUser(id)),
    createFollow: (following_id) => dispatch(createFollow(following_id)),
    deleteFollow: (following_id) => dispatch(deleteFollow(following_id)),
});

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(FollowBar));