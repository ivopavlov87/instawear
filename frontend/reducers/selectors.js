export const selectUserPosts = (state, ownProps) => {
    const user = state.entities.users[ownProps.match.params.id];
    // debugger
    // const user = ownProps.user
    const posts = [];
    if (user) {
        user.postIds.forEach(postId => {
            const post = state.entities.posts[postId];

            // debugger
            if (post !== undefined) {
                posts.push(post)
            }
        });
    }
    // debugger
    return posts.reverse();
    
    // if (Object.keys(state.entities.posts).length > 0) {
    //     debugger
    //     return user.postIds.map(id => state.entities.posts[id]);
    // } else {
    //     return [];
    // }
};

// export const selectUser = (state, ownProps) => { 
//     const user = state.entities.users[ownProps.match.params.id];
//     return user;
// }

export const selectPost = (state, ownProps) => { 
    return state.entities.posts[ownProps.match.params.id]
};

export const selectPostLikes = (state, ownProps) => {
    const postLikes = state.entities.posts[ownProps.postId].like_ids;
    return Object.values(state.entities.likes).filter(like =>
        postLikes.includes(like.id)); // takes the values of the likes so that we have access to user_id of a like
};

export const selectPostLikers = (state, ownProps) => state.entities.posts[ownProps.postId].liker_ids;

export const selectPostComments = (state, ownProps) => ownProps.post.comment_ids.map(
    id => state.entities.comments[id]);


// export const selectUserFollowers = (state, ownProps) => { 
//     const followers = ownProps.user.followers.follower_ids;
//     debugger
//     return followers;
// }   

export const selectFolloweesPosts = (state, followees) => {
    // let followees = selectFollowees(state);
    let posts = state.entities.posts;
    // let followeesIds = Object.keys(followees);
    let followeesIds = [];
    let followeesPosts = {};

    // if (followees) {
        for (let followee in followees) {
            followeesIds.push(followees[followee].id);
        }
    // }

    // if (posts) {
        for (let post in posts) {
            if (followeesIds.includes(posts[post].user_id)) {
                followeesPosts[post] = posts[post];
            }
        };
    // }

    return followeesPosts;
}

export const selectFollowees = state => {
    let users = state.entities.users;
    let currentUserId = state.session.id;
    let followees = {};

    // if (users) {
        for (let user in users) {
            if (users[user].followerIds.includes(currentUserId) || users[user].id === currentUserId) {
                followees[user] = users[user];
            }
        };
    // }

    return followees;
}

export const selectCurrentUserFollowers = state => {
    let users = state.entities.users;
    let currentUserId = state.session.id;
    let followers = {};

    for (let user in users) {
        if (users[user].followerIds.includes(currentUserId)) {
            followers[user] = users[user];
        }
    };

    return followers;
}

export const selectCurrentUserFollowing = state => {
    let users = state.entities.users;
    let currentUserId = state.session.id;
    let following = {};

    for (let user in users) {
        if (users[user].followingIds.includes(currentUserId)) {
            following[user] = users[user];
        }
    };

    return following;
}