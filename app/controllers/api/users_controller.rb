class Api::UsersController < ApplicationController
  def index 
    @users = User.all 
    render :index, status: 200
  end

  def show 
    @user = User.where(id: params[:id]).includes(:posts)[0]
    @posts = @user.posts.with_attached_photo
    @followers = @user.followers
    @following = @user.following
    if @user 
      render :show
    else 
      render json: ["No such user"], status: 404 
    end 
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login(@user)
      render :create, status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update 
    @user = current_user
    @posts = @user.posts.with_attached_photo
    
    if @user.update(user_params)
      render :show, status: 200 
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def search 
    @users = User.search(params[:username])
    if @users.any? 
      render :search, status: 200
    else 
      render json: {users: { none: false }}, status: 200
    end 
  end 

  private

  def user_params
    params.require(:user).permit(:name, :username, :password, :email, :bio, :website, :profile_photo, :phone_number, :gender)
  end

end
