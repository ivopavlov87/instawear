# json.partial!('/api/users/user', user: @user)  
json.user do
    json.set! @user.id do 
        json.partial!('/api/users/user', user: @user) 
    end   
end

@posts ||= []

json.posts do 
    @posts.each do |post|
        json.set! post.id do
            json.partial!('/api/posts/post', post: post)
        end 
    end 
end  

@likes ||= []

json.likes do 
    @likes.each do |like|
        json.set! like.id do 
            json.partial!('/api/likes/like', like: like)
        end
    end 
end 

@followers ||= []
@following ||= []

json.followers do   
    @followers.each do |follower| 
        json.set! follower.id do 
            json.partial!('/api/users/user', user: follower) 
        end
    end
end

json.following do   
    @following.each do |following| 
        json.set! following.id do 
            json.partial!('/api/users/user', user: following) 
        end
  end
end
