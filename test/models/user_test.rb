# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  name            :string(30)       not null
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  bio             :string(100)
#  website         :string
#  gender          :string
#  phone_number    :string(15)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
