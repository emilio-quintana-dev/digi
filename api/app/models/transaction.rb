class Transaction < ApplicationRecord
  belongs_to :account
  has_one :user, through: :account

  def sync(movement_response)
    update!(
      reference: movement_response.reference,
      date: movement_response.date,
      detail: movement_response.detail,
      debit: movement_response.debit,
      credit: movement_response.credit,
      extra_data: movement_response.extra_data,
    )
  end
end
