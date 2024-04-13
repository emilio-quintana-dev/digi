module Prometeo
  class MovementResponse
    def initialize(id:, reference:, date:, detail:, debit:, credit:, extra_data:)
      @id = id
      @reference = reference
      @date = date
      @detail = detail
      @debit = debit
      @credit = credit
      @extra_data = extra_data
    end

    def self.from_json(provider_response)
      new(
        id: provider_response["id"],
        reference: provider_response["reference"],
        date: provider_response["date"],
        detail: provider_response["detail"],
        debit: provider_response["debit"],
        credit: provider_response["credit"],
        extra_data: provider_response["extra_data"],
      )
    end

    attr_accessor :id, :reference, :date, :detail, :debit, :credit, :extra_data
  end
end
