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
    fetchUser: id => dispatch(fetchUser(id)),
    createFollow: (followed_id) => dispatch(createFollow(followed_id)),
    deleteFollow: (followed_id) => dispatch(deleteFollow(followed_id)),
});

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(FollowBar));