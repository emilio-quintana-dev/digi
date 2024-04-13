class AuthFieldSerializer < ActiveModel::Serializer
  attributes(
    :name,
    :type,
    :interactive,
    :optional,
    :label_es,
    :label_en
  )
end
