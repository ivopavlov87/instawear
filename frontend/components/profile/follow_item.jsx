// import FollowBarContainer from '../follow-bar/follow_bar_container';
// import React from 'react';
// import { withRouter } from 'react-router-dom';

// const FollowItem = (props) => {
//     let { user, closeForm } = props;
//     // debugger
//     return (
//         <div className="profile-follow-item">
//             <div>
//                 <img src={user.profilePhoto} className="profile-follow-avatar"
//                     onClick={() => {
//                         closeForm(false);
//                         props.history.push(`/user/${user.id}`);
//                     }}
//                 />
//             </div>
            
//             <div className="follow-name-info">
//                 <p onClick={() => { closeForm(false); props.history.push(`/user/${user.id}`); }} 
//                     className="follow-username">
//                     {user.username}
//                 </p>
//                 <p><strong className="follow-name" >
//                     {user.name}
//                 </strong></p>
//             </div>
//             <div className="profile-follow-item-btn">
//                 <FollowBarContainer user={user} />
//             </div>
//         </div>
//     )
// }

// export default withRouter(FollowItem); 

import FollowBarContainer from '../follow-bar/follow_bar_container';
import React from 'react';
import { withRouter } from 'react-router-dom';


class FollowItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.fetchUsers();
        // this.props.fetchUser(this.props.user.id)
        // : following_id, : follower_id
        // let follow = { following_id: this.props.user.id, follower_id: this.props.currentUserId };
        // this.props.fetchFollow(follow);
    }

    render() {
        let { user, closeForm } = this.props;
        // debugger
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