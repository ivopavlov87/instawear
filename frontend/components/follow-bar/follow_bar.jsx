import React from 'react';

class FollowBar extends React.Component {
    constructor(props) {
        super(props);

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
    }

    componentDidMount() {
        this.props.fetchUser(this.props.user);
    }

    componentDidUpdate() {
        let { user } = this.props; 
        if (user === undefined) {
            this.props.fetchUser(user.id);
        }
    }

    unfollow(e) {
        // e.stopPropagation();
        // let followers = this.props.followers;
        // let curentUserFollow = followers.filter(follower => follower.followed_id === this.props.currentUserId);
        // if (curentUserFollow) this.props.deleteFollow(curentUserFollow[0]);
        this.props.deleteFollow(this.props.user.id);
    }

    follow(e) {
        // e.stopPropagation();
        const userId = this.props.user; // pass the userId from the profile
        this.props.createFollow({ followed_id: userId, follower_id: this.props.currentUserId });
    }

    render() {
        // return <p>from the follow bar</p>
        let { user, currentUserId } = this.props;
        if (user === undefined) {
            return <div></div>
        }

        if (user.id === currentUserId) {
            return <></>
        }

        if (user.followedByCurrentUser) {
            return (
                <button
                    className="following"
                    onClick={this.unfollow}>
                    <i className="following-icon"></i>
                    Following
                </button>
            );
        } else {
            return (
                <button
                    className="follow"
                    onClick={this.follow}>
                    <i className="follow-icon"></i>
                    Follow
                </button>
            );
        }
    }
}

export default FollowBar;