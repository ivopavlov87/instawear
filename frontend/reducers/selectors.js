export const selectUserPosts = (state, ownProps) => {
    const user = selectUser(state, ownProps);
    const posts = [];
    if (user) {
        user.postIds.forEach(postId => {
            const post = state.entities.posts[postId];

            if (post !== undefined) {
                posts.push(post)
            }
        });
    }
    return posts;
    
    // if (Object.keys(state.entities.posts).length > 0) {
    //     debugger
    //     return user.postIds.map(id => state.entities.posts[id]);
    // } else {
    //     return [];
    // }
};

export const selectUser = (state, ownProps) => { 
    const user = state.entities.users[ownProps.match.params.id];
    return user;
}

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