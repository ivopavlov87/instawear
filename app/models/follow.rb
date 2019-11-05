class Follow < ApplicationRecord
  validates :following_id, :follower_id, presence: true
  validates :following_id, :uniqueness => { :scope => :follower_id }

  belongs_to :follower, 
    foreign_key: :follower_id, 
    class_name: :User

  belongs_to :following, 
    foreign_key: :following_id, 
    class_name: :User
end

