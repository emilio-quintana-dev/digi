class UsersController < ApplicationController
  before_action :sync_accounts, only: [:accounts]
  before_action :sync_transactions, only: [:transactions]

  def accounts
    accounts = Rails.cache.fetch("#{cache_key_for_user}_accounts", expires_in: 12.hours) do
      user_accounts.to_a
    end

    if accounts.any?
      render json: accounts.map { |account| account.to_api.serializable_hash }
    else
      head :no_content
    end
  end

  def transactions
    transactions = Rails.cache.fetch("#{cache_key_for_user}_transactions", expires_in: 12.hours) do
      user_transactions.limit(50).to_a
    end

    if transactions.any?
      render json: transactions.map { |transaction|
        transaction.to_api.serializable_hash
      }
    else
      head :no_content
    end
  end

  private

  def sync_transactions
    check_for_expired_session_keys

    user.accounts.each do |account|
      session_key = SessionKey.find_by(user:, provider: account.provider)

      transaction_responses = api_gateway.get_transactions(
        session_key: session_key.reload.key,
        account:,
      )

      transaction_responses.each do |transaction_response|
        transaction = Transaction.find_by(reference: transaction_response.reference)

        if transaction
          transaction.sync(transaction_response)
        else
          Transaction.create!(
            account:,
            credit: transaction_response.credit,
            date: transaction_response.date,
            debit: transaction_response.debit,
            detail: transaction_response.detail,
            extra_data: transaction_response.extra_data,
            prometeo_account_id: transaction_response.id,
            reference: transaction_response.reference,
            digibox_category: get_digibox_category(transaction_response),
            category: get_digibox_category(transaction_response),
          )
        end
      rescue ActiveModel::RangeError => _exception
      end
    end
  end

  def get_digibox_category(transaction_response)
    digibox_api_gateway.get_category(transaction_response.detail)
  end

  def digibox_api_gateway
    Digibox::ApiGateway.new
  end

  def sync_accounts
    check_for_expired_session_keys

    user.session_keys.each do |session_key|
      account_responses = api_gateway.get_accounts(
        session_key: session_key.reload.key,
        provider: session_key.provider,
      )

      account_responses.each do |account_response|
        account = Account.find_by(prometeo_account_id: account_response.id)

        if account
          account.sync(account_response)
        else
          # Create account
        end
      end
    end
  end

  def check_for_expired_session_keys
    user.session_keys.each do |session_key|
      if session_key.expired?
        session_key.refresh
      end
    end
  end

  def user_accounts
    user.accounts
  end

  def user_transactions
    user.transactions
  end

  def cache_key_for_user
    "user_#{user.id}"
  end

  def user
    @user ||= User.find_by(id: params[:id])
  end

  def api_gateway
    @api_gateway ||= Prometeo::ApiGateway.new
  end
end
