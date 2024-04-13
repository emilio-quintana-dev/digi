Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  resources :providers, only: [:index]
  resources :provider_auth_sessions, only: [:create]
  resources :users do
    get "accounts", on: :member
    get "transactions", on: :member
  end
end
