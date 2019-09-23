json.extract! user, :id, :username, :email, :name, :bio, :gender, :phone_number

if user.profile_photo.attached?
    json.profilePhoto url_for(user.profile_photo)
else 
    json.profilePhoto asset_path('/images/profile-default.jpg')
end 

json.postIds user.post_ids

# json.followers user.followers
# json.following user.following

# json.followerCount user.followers.length
# json.followingCount user.following.length

# json.followedByCurrentUser user.followers.include?(current_user)