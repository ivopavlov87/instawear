// import FollowBarContainer from '../follow-bar/follow_bar_container';
import React from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FollowItem from './follow_item_container';
import { fetchUsers } from '../../actions/user_actions';
import { fetchFollows } from "../../actions/follow_actions";


class ProfileFollowers extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchUsers();
        // this.props.fetchFollows();
    }

    render() {
        let { followers, showFollowers } = this.props;
        return <div className = "profile-follows followers">
            <div className = "follows-header">
                <p className = "follows-title">Followers</p >
                <div className="close" onClick={() => showFollowers(false)}></div>
            </div>
            <div className="follows-list">
                {followers.map((follower, idx) => {
                    return <FollowItem
                        user={follower}
                        key={`user-follower-${idx}`}
                        closeForm={showFollowers}
                    />
                })}
            </div>
            <div className="screen"
                onClick={() => showFollowers(false)}>
            </div>
        </div >
    }
}

// const mapStateToProps = (state, ownProps) => {
// };

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()),
    fetchFollows: () => dispatch(fetchFollows())
});

export default connect(null, mapDispatchToProps)(ProfileFollowers);

