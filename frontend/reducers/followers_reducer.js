import { RECEIVE_USER } from '../actions/user_actions';
import {
    RECEIVE_FOLLOW,
    REMOVE_FOLLOW
} from '../actions/follow_actions';

const userFollowersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return action.payload.followers || []; 
        default:
            return state;
    }
};

export default userFollowersReducer; 