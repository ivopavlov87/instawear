json.extract! post, :id, :user_id, :caption, :location, :updated_at, :created_at, :like_ids, :comment_ids, :liker_ids
json.photoUrl url_for(post.photo) || null
# json.photo post.photo