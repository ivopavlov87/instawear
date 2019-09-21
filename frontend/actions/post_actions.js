import * as PostAPIUtil from '../util/post_api_util';

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const REMOVE_POST = 'REMOVE_POST';


const receiveAllPosts = payload => ({
    type: RECEIVE_ALL_POSTS,
    payload
});

const receivePost = payload => ({
    type: RECEIVE_POST,
    payload
});

const deletePost = post => ({
    type: REMOVE_POST,
    post
});

export const fetchAllPosts = () => dispatch => {
    return PostAPIUtil.fetchPosts()
        .then(payload => dispatch(receiveAllPosts(payload)));
};

export const fetchPost = id => dispatch => {
    return PostAPIUtil.fetchPost(id)
        .then(payload => dispatch(receivePost(payload)));
};

export const removePost = post => dispatch => {
    return PostAPIUtil.deletePost(post.id)
        .then(() => dispatch(deletePost(post)));
};

export const updatePost = post => dispatch => {
    return PostAPIUtil.updatePost(post)
        .then(updatedPost => dispatch(receivePost(updatedPost)));
};

export const createPost = post => dispatch => {
    return PostAPIUtil.createPost(post)
        .then(newPost => dispatch(receivePost(newPost)));
};
