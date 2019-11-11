import { RECEIVE_USER } from '../actions/user_actions';
import {
    RECEIVE_FOLLOW,
    REMOVE_FOLLOW
} from '../actions/follow_actions';

const userFollowingReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_USER:
            return action.payload.following || [];
        // case RECEIVE_FOLLOW:
        //     debugger
        // case REMOVE_FOLLOW:
        //     debugger 
        default:
            return state;
    }
};

export default userFollowingReducer; 