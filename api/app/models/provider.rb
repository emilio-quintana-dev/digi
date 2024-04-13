class Provider < ApplicationRecord
  has_many :auth_fields

  scope :ecuadorean, -> { where(country: "EC") }
  scope :test, -> { where(name: "Test Provider") }
end
