class Account < ApplicationRecord
  encrypts :username, deterministic: true
  encrypts :password

  belongs_to :provider
  has_many :transactions

  def sync(account_response)
    update!(
      name: account_response.name,
      account_number: account_response.number,
      balance: account_response.balance,
      currency: account_response.currency,
    )
  end
end
