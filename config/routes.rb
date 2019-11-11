Rails.application.routes.draw do
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    get 'search/:username', to: 'users#search'
    resources :users, only: [:create, :show, :update, :index]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :destroy, :show, :index, :update]
    resources :comments, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :follows, only: [:index, :create, :destroy, :show]
  end 
end
