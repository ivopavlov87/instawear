import * as FollowAPIUtil from '../util/follow_api_util';

export const RECEIVE_FOLLOW = 'RECEIVE_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

const receiveFollow = follow => ({
    type: RECEIVE_FOLLOW,
    follow
});

const removeFollow = payload => ({
    type: REMOVE_FOLLOW,
    id: payload.id,
    following_id: payload.following_id,
    follower_id: payload.follower_id,
});

export const createFollow = follow => dispatch => {
    return FollowAPIUtil.createFollow(follow)
        .then(follow => dispatch(receiveFollow(follow)));
};

export const deleteFollow = following_id => dispatch => {
    return FollowAPIUtil.deleteFollow(following_id)
        .then(payload => dispatch(removeFollow(payload)));
};