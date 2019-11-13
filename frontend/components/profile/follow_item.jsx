import FollowBarContainer from '../follow-bar/follow_bar_container';
import React from 'react';
import { withRouter } from 'react-router-dom';


class FollowItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { user, closeForm } = this.props;
        return (
            <div className="profile-follow-item">
                <div>
                    <img src={user.profilePhoto} className="profile-follow-avatar"
                        onClick={() => {
                            closeForm(false);
                            this.props.history.push(`/user/${user.id}`);
                        }}
                    />
                </div>

                <div className="follow-name-info">
                    <p onClick={() => { closeForm(false); this.props.history.push(`/user/${user.id}`); }}
                        className="follow-username">
                        {user.username}
                    </p>
                    <p><strong className="follow-name" >
                        {user.name}
                    </strong></p>
                </div>
                <div className="profile-follow-item-btn">
                    <FollowBarContainer user={user} />
                </div>
            </div>
        )
    }
}

export default withRouter(FollowItem); 