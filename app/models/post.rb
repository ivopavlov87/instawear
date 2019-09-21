class Post < ApplicationRecord
    validates :user_id, presence: true
    
    has_one_attached :photo, dependent: :destroy
    belongs_to :user
    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy 
    has_many :likers, through: :likes, source: :user
end