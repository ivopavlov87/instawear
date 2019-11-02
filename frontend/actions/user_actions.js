import * as UserAPIUtil from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_USERS = 'RECEIVE_USERS';

const receiveUser = payload => ({
    type: RECEIVE_USER,
    payload
});

const receiveUsers = payload => ({
    type: RECEIVE_USERS,
    payload
});

const receiveCurrentUser = user => {
    return {
        type: RECEIVE_CURRENT_USER,
        user
    };
};

export const fetchUser = id => dispatch => {
    return UserAPIUtil.fetchUser(id)
        .then(payload => dispatch(receiveUser(payload)));
};

export const fetchUsers = () => dispatch => {
    return UserAPIUtil.fetchUsers()
        .then(payload => dispatch(receiveUsers(payload)));
};

export const updateUser = (user) => (dispatch) => {
    return UserAPIUtil.updateUser(user).
        then(user => {
            return dispatch(receiveCurrentUser(user));
        });
};

export const searchUsers = username => dispatch => {
    return UserAPIUtil.searchUsers(username)
        .then(payload => dispatch(receiveUsers(payload)));
}; 

