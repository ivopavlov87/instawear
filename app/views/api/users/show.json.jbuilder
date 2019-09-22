json.partial!('/api/users/user', user: @user)  

@posts ||= []

json.posts do 
    @posts.each do |post|
        json.set! post.id do
            json.partial!('/api/posts/post', post: post)
        end 
    end 
end  

# @likes ||= []

# json.likes do 
#     @likes.each do |like|
#         json.set! like.id do 
#             json.partial!('/api/likes/like', like: like)
#         end
#     end 
# end 

# @followers ||= []

# json.followers do 
#     @followers.each do |follower|
#         json.set! follower.id do 
#             json.partial!('/api/follows/follow', follower: follower)
#         end
#     end 
# end 

