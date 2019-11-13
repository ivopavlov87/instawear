import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import {
    RECEIVE_USER
} from "../actions/user_actions";

import {
    RECEIVE_ALL_POSTS,
    RECEIVE_POST,
    REMOVE_POST
} from '../actions/post_actions'; 

import { 
    RECEIVE_FOLLOW, 
    REMOVE_FOLLOW 
} from '../actions/follow_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, action.payload.user);  
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.payload.user.id]: action.payload.user });
        case RECEIVE_POST:
            return Object.assign({}, state, { [action.payload.user.id]: action.payload.user });
        case REMOVE_POST:
            let res = newState[action.post.user_id].postIds
                .filter(postId => postId != action.post.id);
            newState[action.post.user_id].postIds = res;
            return newState;    
        case RECEIVE_ALL_POSTS:
            return Object.assign({}, state, action.payload.users);   
        case RECEIVE_FOLLOW:
            newState[action.follow.following_id].followerCount += 1;
            newState[action.follow.follower_id].followingCount += 1;
            newState[action.follow.following_id].followedByCurrentUser = true;
       
            newState[action.follow.follower_id].followingIds.push(action.follow.following_id);
            newState[action.follow.following_id].followerIds.push(action.follow.follower_id);
            return newState;
        case REMOVE_FOLLOW:
            newState[action.following_id].followerCount -= 1;
            newState[action.follower_id].followingCount -= 1;
            newState[action.following_id].followedByCurrentUser = false;

            newState[action.follower_id].followingIds = newState[action.follower_id].followingIds
                .filter(followingId => followingId !== action.following_id);

            newState[action.following_id].followerIds = newState[action.following_id].followerIds
                .filter(followerId => followerId !== action.follower_id);
            return newState;     
        default:
            return state;
    }
};

export default usersReducer;
