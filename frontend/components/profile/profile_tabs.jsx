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
                <ul>
                    <li>
                        <Link to={`/user/${user.id}`}>
                            <span>{user.postIds.length}</span>
                            <br />
                            POSTS
                        </Link>
                    </li>
                </ul>
                {/* <p><strong>{user.postIds.length}</strong>  posts</p> */}
            </div>
        );
    }

}

export default ProfileTabs;