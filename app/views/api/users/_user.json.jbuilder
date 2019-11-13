json.extract! user, :id, :username, :email, :name, :bio, :gender, :phone_number, :website

if user.profile_photo.attached?
    json.profilePhoto url_for(user.profile_photo)
else 
    json.profilePhoto asset_path('/images/profile-default.jpg')
end 

json.defaultAvatar asset_path('/images/profile-default.jpg')

json.postIds user.post_ids

json.followerIds user.follower_ids
json.followingIds user.following_ids

# json.followers user.followers
# json.following user.following

json.followerCount user.followers.length || 0
json.followingCount user.following.length || 0

json.followedByCurrentUser user.followers.include?(current_user) || user === current_user



