module Prometeo
  class ApiGateway
    def get_providers
      response = PrometeoApi.new(
        base_url: ENV["PROMETEO_API_URL"],
        token: ENV["PROMETEO_API_KEY"],
        suffix: "provider",
      ).get

      response_data = JSON.parse(response.body)

      response_data["providers"].map do |provider_response|
        Prometeo::ProviderResponse.from_json(
          provider_response.merge({ "auth_fields" => [] }),
        )
      end
    end

    def get_provider(code:)
      response = PrometeoApi.new(
        base_url: ENV["PROMETEO_API_URL"],
        token: ENV["PROMETEO_API_KEY"],
        suffix: "provider/#{code}",
      ).get

      response_data = JSON.parse(response.body)

      Prometeo::ProviderResponse.from_json(
        response_data["provider"],
      )
    end

    def get_accounts(session_key:, provider:)
      response = PrometeoApi.new(
        base_url: ENV["PROMETEO_API_URL"],
        token: ENV["PROMETEO_API_KEY"],
        suffix: "account",
        query_parameters: { key: session_key },
      ).get

      response_data = JSON.parse(response.body)

      response_data["accounts"].map do |account_response|
        Prometeo::AccountResponse.from_json(
          account_response.merge({ "provider" => provider }),
        )
      end
    end

    def get_transactions(session_key:, account:)
      response = PrometeoApi.new(
        base_url: ENV["PROMETEO_API_URL"],
        token: ENV["PROMETEO_API_KEY"],
        suffix: "account/#{account.account_number}/movement",
        query_parameters: {
          key: session_key,
          currency: account.currency,
          date_start: "20/11/2020",
          date_end: "23/11/2020",
        },
      ).get

      response_data = JSON.parse(response.body)

      response_data["movements"].map do |movement_response|
        Prometeo::MovementResponse.from_json(movement_response)
      end
    end

    def authenticate(provider:, username:, password:)
      response = PrometeoApi.new(
        base_url: ENV["PROMETEO_API_URL"],
        suffix: "login",
        token: ENV["PROMETEO_API_KEY"],
      ).login(provider:, password:, username:)

      response_data = JSON.parse(response.body)

      response_data["key"]
    end

    class PrometeoApi
      def initialize(
        base_url:,
        token:,
        suffix:,
        query_parameters: {}
      )
        @base_url = base_url
        @token = token
        @suffix = suffix
        @query_parameters = query_parameters
      end

      attr_reader :base_url, :token, :suffix, :query_parameters

      def get
        Excon.get(
          "#{base_url}/#{suffix}/",
          headers: { "X-API-Key": ENV["PROMETEO_API_KEY"] },
          query: {}.merge(query_parameters),
        )
      end

      def login(provider:, username:, password:)
        Excon.post(
          "#{base_url}/#{suffix}/",
          headers: {
            "X-API-Key": ENV["PROMETEO_API_KEY"],
            "Content-Type" => "application/x-www-form-urlencoded",
          },
          body: URI.encode_www_form(
            provider:,
            username:,
            password:,
          ),
        )
      end
    end
  end
end
