module Prometeo
  class ProviderResponse
    def initialize(code:, country:, name:, auth_fields:)
      @code = code
      @country = country
      @name = name
      @auth_fields = auth_fields
    end

    def self.from_json(provider_response)
      new(
        code: provider_response["code"] || provider_response["name"],
        country: provider_response["country"],
        name: provider_response["name"],
        auth_fields: provider_response["auth_fields"].map do |auth_field_response|
          Prometeo::AuthFieldResponse.from_json(auth_field_response)
        end
      )
    end

    attr_accessor :code, :country, :name, :auth_fields
  end
end
