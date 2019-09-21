json.extract! user, :id, :username, :email, :name

# if user.profile_photo.attached?
#     json.profilePhoto url_for(user.profile_photo)
# else 
#     # json.profilePhoto asset_path('avatar-photo.png')
#     json.profilePhoto asset_path('/images/avatar-photo.png')
# end 

# if user.cover_photo.attached?
#     json.coverPhoto url_for(user.cover_photo)
# else 
#     # json.coverPhoto asset_path('cover.png')
#     json.coverPhoto asset_path('/images/cover.png')
# end

# json.postIds user.post_ids

# json.followers user.followers
# json.following user.following

# json.followerCount user.followers.length
# json.followingCount user.following.length

# json.followedByCurrentUser user.followers.include?(current_user)