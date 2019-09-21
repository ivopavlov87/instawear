class Api::LikesController < ApplicationController  
  def create
    @like = Like.new(like_params)
    @like.user_id = current_user.id

    if @like.save 
            render :show, status: 200
        else
            render json: @like.errors.full_messages, status: 422
        end
  end

  def destroy
    @like = Like.where(user_id: current_user.id)
        .where(post_id: params[:id])[0]

    if @like.destroy 
        render :show, status: 200
    else
        render json: ["can't be processed"], status: 422
    end
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :post_id)
  end
end