import { combineReducers } from "redux"; 

import usersReducer from "./users_reducer";
import postsReducer from "./posts_reducer";
import commentsReducer from "./comments_reducer";
import likesReducer from "./likes_reducer";
import followsReducer from "./follows_reducer";
import userSearchReducer from "./user_search_reducer";
import userFollowingReducer from "./following_reducer";
import userFollowersReducer from "./followers_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    follows: followsReducer,
    userSearch: userSearchReducer,
    followers: userFollowersReducer,
    following: userFollowingReducer
});

export default entitiesReducer;