import { 
    RECEIVE_ALL_POSTS, 
    RECEIVE_POST, 
    REMOVE_POST 
} from "../actions/post_actions";

import { RECEIVE_USER } from "../actions/user_actions";

import {
    RECEIVE_COMMENT,
    REMOVE_COMMENT
} from "../actions/comment_actions";

import {
    RECEIVE_LIKE,
    REMOVE_LIKE
} from "../actions/like_actions";


const postsReducer = (state ={}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            return action.payload.posts || {};
        case RECEIVE_POST:
            return Object.assign({}, state, { [action.payload.post.id]: action.payload.post });   
        case REMOVE_POST:
            delete newState[action.post.id];
            return newState;
        case RECEIVE_USER:
            return Object.assign({}, action.payload.posts);
        case RECEIVE_COMMENT:
            newState[action.comment.post_id].comment_ids.push(action.comment.id);
            return newState;
        case REMOVE_COMMENT:
            let postOldCommentIds = newState[action.comment.post_id].comment_ids; 
            let postNewCommentIds = postOldCommentIds.filter(commentId => commentId != action.comment.id);
            newState[action.comment.post_id].comment_ids = postNewCommentIds;
            return newState;
        case RECEIVE_LIKE:
            newState[action.like.post_id].liker_ids.push(action.like.user_id);
            newState[action.like.post_id].like_ids.push(action.like.id);
            return newState;  
        case REMOVE_LIKE:
            newState[action.like.post_id].liker_ids = newState[action.like.post_id].liker_ids
                .filter(likerId => likerId != action.like.user_id); 
            newState[action.like.post_id].like_ids = newState[action.like.post_id].like_ids
                .filter(likeId => likeId != action.like.id);  
            return newState;
        default:
            return state;
    }
}

export default postsReducer;