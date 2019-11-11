import { connect } from 'react-redux';
import FollowItem from './follow_item';
import { fetchUser } from '../../actions/user_actions';
import { fetchFollow } from "../../actions/follow_actions";

const mapStateToProps = (state, ownProps) => ({
    currentUserId: state.session.id,
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
    fetchFollow: follow => dispatch(fetchFollow(follow))
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowItem);
