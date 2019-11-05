export const fetchFollow = id => {
    return $.ajax({
        method: 'GET',
        url: `/api/follows/${id}`
    });
};

export const createFollow = follow => {
    return $.ajax({
        method: 'POST',
        url: '/api/follows',
        // data: { follow: { following_id: following_id } }
        data: { follow }
    });
};

export const deleteFollow = following_id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/follows/${following_id}`
    });
};