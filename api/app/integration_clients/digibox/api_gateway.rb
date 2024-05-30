module Digibox
  class ApiGateway
    def get_category(transaction_name)
      response = DigiBoxApi.new(
        base_url: "http://127.0.0.1:8000",
        suffix: "predict",
      ).generate_prediction(transaction_name)

      response_body = JSON.parse(response.body)

      response_body["prediction"]
    end

    class DigiBoxApi
      def initialize(
        base_url:,
        suffix:
      )
        @base_url = base_url
        @suffix = suffix
      end

      attr_reader :base_url, :suffix

      def generate_prediction(transaction_name)
        Excon.post(
          "#{base_url}/#{suffix}",
          body: JSON.generate([{ DESCRIPTION: transaction_name }]),
          headers: {
            "Content-Type" => "application/json",
          },
        )
      end
    end
  end
end
