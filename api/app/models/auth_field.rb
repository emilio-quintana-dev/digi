class AuthField < ApplicationRecord
  # [NOTE]: This is a workaround for the STI implementation in Rails
  self.inheritance_column = "sti_type"

  scope :required, -> { where(optional: false) }

  belongs_to :provider
end
