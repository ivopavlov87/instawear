@follows.each do |follow|
  json.set! follow.id do
    json.extract! follow, :id, :following_id, :follower_id
  end
end