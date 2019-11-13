class Api::FollowsController < ApplicationController
  def index 
    @follows = Follow.all
    render :index
  end
  
  def show
    @follow = Follow.find_by(id: params[:id])
    if @follow
        render :show
    else
        render json: ["Follow not found"], status: 404
    end
  end

  def create
    @follow = Follow.new(follow_params)

    @follow.follower_id = current_user.id
    if @follow.save!
      render :show
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  def destroy
    # @follow = Follow.where(follower_id: current_user.id)
    # .where(following_id: params[:id])[0]
    @follow = Follow.find_by(follower_id: current_user.id, following_id: params[:id])

    if @follow && @follow.destroy!
      render :show
    else
      render json: @follow.errors.full_messages, status: 422
    end
  end

  private
  def follow_params
    params.require(:follow).permit(:following_id)
  end
end