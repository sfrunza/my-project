Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  get "home" => "home#index"

  namespace :api do
    namespace :v1 do
       resource :session do
        get :show
        get :refresh_token
        delete :destroy
      end
      resources :users, only: %i[show]
      resources :passwords, param: :token
      resources :posts

      resources :services, only: %i[index create destroy] do
        collection { post :bulk_update }
      end

    end
  end

  get "up" => "rails/health#show", as: :rails_health_check
end
