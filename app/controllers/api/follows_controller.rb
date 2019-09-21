class Api::FollowsController < ApplicationController
  def create
    @follow = Follow.new(follow_params)

    @follow.follower_id = current_user.id
    if @follow.save 
        render :show
    else
        render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    @follow = Follow.where(follower_id: current_user.id)
    .where(following_id: params[:id])[0]

    if @follow.destroy 
        render :show
    else
        render json: @follow.errors.full_messages, status: 422
    end
  end

  private

  def follow_params
    params.require(:follow).permit(:follower_id, :following_id)
  end
end