class Api::UsersController < ApplicationController
  def index 
    @users = User.all 
    render :index, status: 200
  end

  def show 
    @user = User.find(params[:id])
    @posts = @user.posts.with_attached_photo
    render :show, status: 200
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :show, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update 
    @user = current_user
    
    if @user.update(user_params)
      render :show, status: 200 
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :password, :email, :bio, :website, :profile_photo)
  end

end
