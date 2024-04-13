class ProviderSerializer < ActiveModel::Serializer
  attributes(
    :id,
    :code,
    :name,
    :country,
    :logo,
    :auth_fields,
  )

  def auth_fields
    object.auth_fields.required.map do |auth_field|
      auth_field.to_api.serializable_hash
    end
  end
end
