module Prometeo
  class AuthFieldResponse
    def initialize(name:, type:, interactive:, optional:, label_es:, label_en:)
      @name = name
      @type = type
      @interactive = interactive
      @optional = optional
      @label_es = label_es
      @label_en = label_en
    end

    def self.from_json(auth_field_response)
      new(
        name: auth_field_response['name'],
        type: auth_field_response['type'],
        interactive: auth_field_response['interactive'],
        optional: auth_field_response['optional'],
        label_es: auth_field_response['label_es'],
        label_en: auth_field_response['label_en']
      )
    end

    attr_accessor :name, :type, :interactive, :optional, :label_es, :label_en
  end
end
