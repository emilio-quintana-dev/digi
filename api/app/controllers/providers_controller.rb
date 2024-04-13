class ProvidersController < ApplicationController
  def index
    @providers = Provider.test

    render json: @providers.map { |provider| provider.to_api.serializable_hash }
  end
end
