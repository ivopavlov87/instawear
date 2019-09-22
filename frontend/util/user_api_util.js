export const fetchUser = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${id}`,
    });
};

export const fetchUsers = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/users',
    });
};

export const updateUser = user => {
    return $.ajax({
        method: "PATCH",
        url: `/api/users/${user.id}`,
        data: user.formData,
        contentType: false,
        processData: false
    });
};

export const searchUsers = username => {
    return $.ajax({
        method: 'GET',
        url: `/api/search/${username}`,
    });
};