class SessionKey < ApplicationRecord
  belongs_to :user
  belongs_to :provider

  def expired?
    5.minutes.ago > created_at
  end

  def refresh
    username, password = account_credentials

    new_session_key = api_gateway.authenticate(
      provider: provider.code,
      username:,
      password:,
    )

    if new_session_key
      update!(key: new_session_key)
    end
  end

  def account_credentials
    account = Account.find_by(
      provider_id:,
      user_id:,
    )

    [account.username, account.password]
  end

  def api_gateway
    Prometeo::ApiGateway.new
  end
end
