import { 
    RECEIVE_USER, 
    RECEIVE_USERS 
} from '../actions/user_actions';

import { 
    RECEIVE_FOLLOW, 
    REMOVE_FOLLOW 
} from '../actions/follow_actions';

const followsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_FOLLOW:
            // debugger
            return Object.assign({}, state, { [action.follow.id]: action.follow });
        case REMOVE_FOLLOW:
            // debugger
            delete newState[action.id];
            return newState; 
        // case RECEIVE_USER:
        //     debugger
        //     let follows = action.payload.follows;
        //     if (follows) {
        //         newState = Object.assign({}, state, follows);
        //     }
        //     return newState;
        // case RECEIVE_USERS: // check this later for showing up the following bar in the feed
        //     debugger
        //     if (action.payload.follows) {
        //         Object.values(action.payload.follows).map(follow => (
        //             newState[follow.id] = follow
        //         ));
        //     }
        //     return newState;
        default:
            return state;
    }
}

export default followsReducer;