export const fetchPost = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/posts/${id}`,
    });
};

export const fetchPosts = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/posts',
    });
};

export const createPost = post => {
    return $.ajax({
        method: 'POST',
        url: '/api/posts',
        data: post,
        contentType: false,
        processData: false
    });
};

export const updatePost = post => {
    return $.ajax({
        method: 'PATCH',
        url: `/api/posts/${post.id}`,
        data: { post }
    });
};

export const deletePost = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/posts/${id}`,
    });
};

