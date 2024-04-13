class AccountSerializer < ActiveModel::Serializer
  attributes(
    :balance,
    :name,
    :masked_account_number,
  )

  def masked_account_number
    object.account_number.to_s.gsub(/.(?=.{4})/, "*")
  end
end
