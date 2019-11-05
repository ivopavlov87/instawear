Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :index]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :destroy, :show, :index, :update]
    resources :comments, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :follows, only: [:create, :destroy, :show]
  end 
end
