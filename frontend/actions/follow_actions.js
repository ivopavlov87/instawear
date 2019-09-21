import * as FollowAPIUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

const receiveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow
});

const removeFollow = payload => ({
    type: REMOVE_FOLLOW,
    followed_id: payload.followed_id,
    follower_id: payload.followed_id,
});

export const createFollow = follow => dispatch => {
    return followAPIUtil.createFollow(follow)
        .then(follow => dispatch(receiveFollow(follow)));
};

export const deleteFollow = followed_id => dispatch => {
    return FollowAPIUtil.deleteFollow(followed_id)
        .then((payload) => dispatch(removeFollow(payload)));
};