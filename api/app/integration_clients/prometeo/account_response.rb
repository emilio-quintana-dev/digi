module Prometeo
  class AccountResponse
    def initialize(id:, name:, number:, branch:, currency:, balance:, provider:)
      @id = id
      @name = name
      @number = number
      @branch = branch
      @currency = currency
      @balance = balance
      @provider = provider
    end

    def self.from_json(provider_response)
      new(
        id: provider_response["id"],
        name: provider_response["name"],
        number: provider_response["number"],
        branch: provider_response["branch"],
        currency: provider_response["currency"],
        balance: provider_response["balance"],
        provider: provider_response["provider"],
      )
    end

    attr_accessor :id, :name, :number, :branch, :currency, :balance, :provider
  end
end
