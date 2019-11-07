import React from 'react';
import { withRouter } from 'react-router-dom';

const SearchItem = (props) => {
    let { user, changeRendering} = props;
    return user === false ? (
        <div className="search-no-item">
            <p>No results found.</p>
        </div>
    ) : (
        <div className="search-item" onClick={() => {
            changeRendering(false);
            props.history.push(`/user/${user.id}`);
        }}>
            <img src={user.profilePhoto} className="searched-user-avatar"/>
            <div>
                <strong className="searched-name">{user.name}</strong>
                <p className="searched-username">{user.username}</p>
            </div>
        </div>
    )
};

export default withRouter(SearchItem); 