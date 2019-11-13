export const fetchFollow = follow => {
    return $.ajax({
        method: 'GET',
        url: `/api/follows/${follow.id}`
    });
};

export const fetchFollows = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/follows/'
    });
};

export const createFollow = follow => {
    return $.ajax({
        method: 'POST',
        url: '/api/follows',
        data: { follow }
    });
};

export const deleteFollow = following_id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/follows/${following_id}`
    });
};