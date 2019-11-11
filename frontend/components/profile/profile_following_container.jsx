// import FollowBarContainer from '../follow-bar/follow_bar_container';
import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FollowItem from './follow_item_container';
import { fetchUsers } from '../../actions/user_actions';
import { fetchFollows } from "../../actions/follow_actions";


class ProfileFollowing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers();
        // this.props.fetchFollows();
    }

    render() {
        let { following, showFollowing } = this.props;
        return <div className="profile-follows following">
            <div className="follows-header">
                <p className="follows-title">Following</p>
                <div className="close" onClick={() => showFollowing(false)}></div>
            </div>
            <div className="follows-list">
                {following.map((fwing, idx) => {
                    return <FollowItem
                        user={fwing}
                        key={`user-following-${idx}`}
                        closeForm={showFollowing}
                    />
                })}
            </div>
            <div className="screen"
                onClick={() => showFollowing(false)}>
            </div>
        </div>
    }
}

// const mapStateToProps = (state, ownProps) => {
// };

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFollows: () => dispatch(fetchFollows())
});

export default connect(null, mapDispatchToProps)(ProfileFollowing);

