class Like < ApplicationRecord
    validates :user_id, :post_id, presence: true
    validates :post_id, uniqueness: { scope: :user_id }

    belongs_to :post 
    belongs_to :user 
end
