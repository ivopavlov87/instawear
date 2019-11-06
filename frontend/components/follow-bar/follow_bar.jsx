import React from 'react';

class FollowBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { suggestionOn: false }

        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.changeSuggestion = this.changeSuggestion.bind(this);
    }

    changeSuggestion(bool) {
        this.setState({ suggestionOn: bool });
    }

    // componentDidMount() {
    //     this.props.fetchUser(this.props.user);
    // }

    // componentDidUpdate() {
    //     let { user } = this.props; 
    //     if (user === undefined) {
    //         this.props.fetchUser(user.id);
    //     }
    // }

    unfollow(e) {
        // e.stopPropagation();
        // let followers = this.props.followers;
        // let curentUserFollow = followers.filter(follower => follower.followed_id === this.props.currentUserId);
        // if (curentUserFollow) this.props.deleteFollow(curentUserFollow[0]);
        this.props.deleteFollow(this.props.user.id);
    }

    follow(e) {
        // e.stopPropagation();
        const userId = this.props.user.id; // pass the userId from the profile
        this.props.createFollow({ following_id: userId});//, follower_id: this.props.currentUserId });
    }

    renderSuggestion() {
        let { user } = this.props;
        return (
            this.state.suggestionOn === false ? <div></div> : (
                <div>
                    <div className="sgs-popup-frame">
                        <div className="unfollow-sgs-user">
                            <div className="unfollow-sgs-avatar-wrapper">
                                <img className="unfollow-sgs-img" src={user.profilePhoto} alt={user.username} />
                            </div>
                            <p id="sgs-popup-username-p">{`Unfollow @${user.username}?`}</p>
                        </div>
                        <div onClick={() => { this.unfollow(); this.changeSuggestion(false) }} className="unfollow-sgs-red">
                            <p id="sgs-popup-unfollow-p">Unfollow</p>
                        </div>
                        <div id="popup-cancel" className="unfollow-sgs-div" onClick={() => this.changeSuggestion(false) }>
                            <p id="sgs-popup-cancel-p">Cancel</p>
                        </div>
                    </div>
                    <div className="screen"
                        onClick={() => this.changeSuggestion(false)}>
                    </div>
                </div>
            )
        );
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

        if (this.props.followedByCurrentUser) {
            return (
                <div>
                    <p
                        className="profile-header-btn unfollow-btn"
                        onClick={() => { this.changeSuggestion(true) }}>
                        <i className="following-icon"></i>
                        Following
                    </p>
                    {this.renderSuggestion()}
                </div>
            );
        } else {
            return (
                <p
                    className="profile-header-btn follow-btn"
                    onClick={this.follow}>
                    <i className="follow-icon"></i>
                    Follow
                </p>
            );
        }
    }
}

export default FollowBar;