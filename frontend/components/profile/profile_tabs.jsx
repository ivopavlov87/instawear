import React from 'react';
import { Link } from 'react-router-dom';

class ProfileTabs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = this.props.user;
        return (
            <div className="profile-tabs">
                <div>
                    <span>{user.postIds.length}</span>
                    <br />
                    POSTS
                </div>
                {/* <p><strong>{user.postIds.length}</strong>  posts</p> */}
            </div>
        );
    }

}

export default ProfileTabs;