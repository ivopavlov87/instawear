import { 
    RECEIVE_COMMENT,
    REMOVE_COMMENT
} from '../actions/comment_actions';

import {
    RECEIVE_ALL_POSTS,
    RECEIVE_POST
} from '../actions/post_actions';

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_POST:
            return Object.assign({}, state, action.payload.comments);
        case RECEIVE_ALL_POSTS:
            if (action.payload.comments === undefined) {
                return state;
            } else {
                return action.payload.comments;
            }
        case RECEIVE_COMMENT:
            return Object.assign({}, state, { [action.comment.id]: action.comment });
        case REMOVE_COMMENT:
            let newState = Object.assign({}, state);
            delete newState[action.comment.id];
            return newState;         
        default:
            return state;
    }   
}

export default commentsReducer;