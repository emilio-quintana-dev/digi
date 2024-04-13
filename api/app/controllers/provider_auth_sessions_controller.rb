class ProviderAuthSessionsController < ApplicationController
  # Este controlador va a ser usado con un usuario asocie a una cuenta de un proveedor.
  def create
    # El Session Key expira relativamente rapido.
    @session_key = api_gateway.authenticate(
      provider: provider.code,
      username: params[:username],
      password: params[:password],
    )

    if @session_key
      ApplicationRecord.transaction do
        sync_session_key
        sync_accounts
      end

      head :ok
    else
      head :unauthorized
    end
  end

  private

  # Por ahora estoy creando todas las cuentas automaticamente.
  # En el futuro, se podria hacer que el usuario elija que cuentas
  # que quiere compartir con nosotros.
  def sync_accounts
    account_responses = api_gateway.get_accounts(
      session_key: @session_key,
      provider:,
    )

    account_responses.each do |account_response|
      Account.find_or_create_by!(
        provider_id: provider.id,
        user_id: user.id,
        prometeo_account_id: account_response.id,
        username: params[:username],
        password: params[:password],
        name: account_response.name,
        account_number: account_response.number,
        balance: account_response.balance,
        currency: account_response.currency,
      )
    end
  end

  def sync_session_key
    SessionKey.find_or_create_by!(
      key: @session_key,
      user_id: user.id,
      provider_id: provider.id,
    )
  end

  def user
    User.find_by(id: params[:user_id])
  end

  def provider
    @provider ||= Provider.find_by(id: params[:provider_id])
  end

  def api_gateway
    Prometeo::ApiGateway.new
  end
end
